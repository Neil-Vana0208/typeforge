/* TYPEFORGE ONLINE LAYER
   Guest/anonymous auth keeps the first version simple and avoids collecting email by default.
   An anonymous account persists in the browser; cross-device identity can be added later with
   an optional sign-in method. Supabase Auth anonymous users use the authenticated role.
*/
(function () {
  const hasConfig = window.TYPEFORGE_SUPABASE_URL &&
    window.TYPEFORGE_SUPABASE_PUBLISHABLE_KEY &&
    !window.TYPEFORGE_SUPABASE_URL.includes("YOUR-PROJECT") &&
    !window.TYPEFORGE_SUPABASE_PUBLISHABLE_KEY.includes("YOUR_PUBLISHABLE_KEY");

  const statusEl = document.getElementById("leaderboardStatus");
  const listEl = document.getElementById("leaderboardList");
  const leaderboardScreen = document.getElementById("leaderboardScreen");
  const leaderboardButton = document.getElementById("leaderboardButton");
  const leaderboardBackButton = document.getElementById("leaderboardBackButton");
  const deleteAccountButton = document.getElementById("deleteAccountButton");

  let client = null;
  let currentUser = null;

  function setStatus(message) {
    if (statusEl) statusEl.textContent = message;
  }

  function avatarFallback() {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#222"/><text x="32" y="39" text-anchor="middle" fill="#eee" font-size="26">TF</text></svg>'
    );
  }

  async function init() {
    if (!hasConfig || !window.supabase) {
      setStatus("ONLINE MODE NOT CONFIGURED — LOCAL MODE ACTIVE");
      return;
    }

    client = window.supabase.createClient(
      window.TYPEFORGE_SUPABASE_URL,
      window.TYPEFORGE_SUPABASE_PUBLISHABLE_KEY
    );

    const { data: existing } = await client.auth.getSession();
    if (existing && existing.session) {
      currentUser = existing.session.user;
    } else {
      const { data, error } = await client.auth.signInAnonymously();
      if (error) {
        setStatus("ONLINE LOGIN FAILED — LOCAL MODE ACTIVE");
        return;
      }
      currentUser = data.user;
    }

    await ensureProfile();
    await pullCloudProfile();
    await refreshLeaderboard();
  }

  async function ensureProfile() {
    const state = window.typeforgeGetOnlineState();
    const { data } = await client.from("profiles").select("id").eq("id", currentUser.id).maybeSingle();
    if (!data) {
      await client.from("profiles").insert({
        id: currentUser.id,
        display_name: state.name,
        design: state.design,
        font: state.font,
        rpg_best_score: state.rpgBestScore,
        rpg_highest_wave: state.rpgHighestWave,
        rpg_level: state.rpgLevel
      });
    }
  }

  async function pullCloudProfile() {
    const { data, error } = await client.from("profiles")
      .select("display_name, avatar_url, design, font, rpg_best_score, rpg_highest_wave, rpg_level")
      .eq("id", currentUser.id).maybeSingle();
    if (error || !data) return;

    localStorage.setItem("typeforgeProfileName", data.display_name || "PLAYER");
    localStorage.setItem("typeforgeProfileDesign", data.design || "forge");
    localStorage.setItem("typeforgeProfileFont", data.font || "system");
    localStorage.setItem("typeforgeRPGBestScore", String(data.rpg_best_score || 0));
    localStorage.setItem("typeforgeRPGHighestWave", String(data.rpg_highest_wave || 1));
    localStorage.setItem("typeforgeRPGLevel", String(data.rpg_level || 1));
    if (data.avatar_url) localStorage.setItem("typeforgeProfileAvatar", data.avatar_url);
    if (window.typeforgeRefreshProfile) window.typeforgeRefreshProfile();
  }

  async function uploadAvatar(file) {
    if (!client || !currentUser || !file) return;
    if (!/^image\/(jpeg|png|gif)$/.test(file.type)) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Profile pictures must be 2 MB or smaller.");
      return;
    }
    const ext = file.type === "image/gif" ? "gif" : file.type === "image/png" ? "png" : "jpg";
    const path = `${currentUser.id}/avatar.${ext}`;
    const { error } = await client.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type });
    if (error) return;
    const { data } = client.storage.from("avatars").getPublicUrl(path);
    const avatarUrl = `${data.publicUrl}?v=${Date.now()}`;
    await client.from("profiles").update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() }).eq("id", currentUser.id);
    localStorage.setItem("typeforgeProfileAvatar", avatarUrl);
  }

  async function syncProfile() {
    if (!client || !currentUser) return;
    const state = window.typeforgeGetOnlineState();
    await client.from("profiles").update({
      display_name: state.name,
      design: state.design,
      font: state.font,
      rpg_level: state.rpgLevel,
      updated_at: new Date().toISOString()
    }).eq("id", currentUser.id);
    await refreshLeaderboard();
  }

  async function syncCombat() {
    if (!client || !currentUser) return;
    const state = window.typeforgeGetOnlineState();
    await client.from("profiles").update({
      display_name: state.name,
      design: state.design,
      font: state.font,
      rpg_best_score: state.rpgBestScore,
      rpg_highest_wave: state.rpgHighestWave,
      rpg_level: state.rpgLevel,
      updated_at: new Date().toISOString()
    }).eq("id", currentUser.id);
    await refreshLeaderboard();
  }

  async function refreshLeaderboard() {
    if (!client) return;
    const { data, error } = await client.from("leaderboard_public")
      .select("display_name, avatar_url, design, font, rpg_best_score, rpg_highest_wave")
      .order("rpg_best_score", { ascending: false })
      .order("rpg_highest_wave", { ascending: false })
      .limit(50);
    if (error) {
      setStatus("LEADERBOARD UNAVAILABLE");
      return;
    }
    setStatus("TOP RPG COMBAT SCORES");
    listEl.innerHTML = "";
    (data || []).forEach((row, index) => {
      const item = document.createElement("div");
      item.className = "leaderboard-row";
      const avatar = row.avatar_url || avatarFallback();
      item.innerHTML = `
        <div class="leaderboard-rank">#${index + 1}</div>
        <div class="leaderboard-user"><img class="leaderboard-avatar" src="${escapeHtml(avatar)}" alt=""><span class="leaderboard-name"></span></div>
        <div class="leaderboard-score">${Number(row.rpg_best_score || 0).toLocaleString()} PTS</div>
        <div class="leaderboard-wave">WAVE ${Number(row.rpg_highest_wave || 1)}</div>`;
      item.querySelector(".leaderboard-name").textContent = row.display_name || "PLAYER";
      listEl.appendChild(item);
    });
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  leaderboardButton.addEventListener("click", async () => {
    document.getElementById("levelList").style.display = "none";
    document.getElementById("profileScreen").style.display = "none";
    leaderboardScreen.style.display = "block";
    await refreshLeaderboard();
  });

  leaderboardBackButton.addEventListener("click", () => {
    leaderboardScreen.style.display = "none";
    if (window.showLevelMenu) window.showLevelMenu();
  });

  window.addEventListener("typeforge:profile-changed", async (event) => {
    if (event.detail && event.detail.avatarFile) await uploadAvatar(event.detail.avatarFile);
    await syncProfile();
  });
  window.addEventListener("typeforge:rpg-progress", syncCombat);
  window.addEventListener("typeforge:rpg-finished", syncCombat);

  deleteAccountButton.addEventListener("click", async () => {
    if (!client || !currentUser) {
      alert("Online account mode is not configured yet.");
      return;
    }
    const ok = confirm("Delete your Typeforge online account and leaderboard entry? This cannot be undone.");
    if (!ok) return;
    const session = await client.auth.getSession();
    const token = session.data.session && session.data.session.access_token;
    if (!token) return;
    const response = await fetch(`${window.TYPEFORGE_SUPABASE_URL}/functions/v1/delete-account`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      alert("Account deletion failed. Please try again.");
      return;
    }
    localStorage.clear();
    await client.auth.signOut();
    alert("Your Typeforge online account has been deleted.");
    location.reload();
  });

  init();
})();
