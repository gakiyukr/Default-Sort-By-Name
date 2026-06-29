// ==UserScript==
// @name         Default Sort By Name
// @namespace    https://tampermonkey.net/
// @version      2.2
// @description  Automatically sort GitHub and Vercel projects by name
// @match        https://github.com/*
// @match        https://vercel.com/*
// @updateURL    https://cdn.jsdelivr.net/gh/gakiyukr/Default-Sort-By-Name@main/index.js
// @downloadURL  https://cdn.jsdelivr.net/gh/gakiyukr/Default-Sort-By-Name@main/index.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 不同 Vercel 账号的团队路径不同，需要时只修改这里。
    const VERCEL_ACCOUNT_SLUG = "gakiyukrs-projects";

    function fixGitHubSort() {
        const url = new URL(window.location.href);

        if (url.hostname !== "github.com") return;

        // 只处理 ?tab=repositories 页面
        if (url.searchParams.get("tab") !== "repositories") return;

        // 已经是 name 就不处理
        if (url.searchParams.get("sort") === "name") return;

        url.searchParams.set("sort", "name");

        // 不增加浏览历史
        window.location.replace(url.toString());
    }

    function fixVercelSort() {
        const url = new URL(window.location.href);

        if (url.hostname !== "vercel.com") return;
        if (url.pathname !== `/${VERCEL_ACCOUNT_SLUG}` &&
            url.pathname !== `/${VERCEL_ACCOUNT_SLUG}/`) return;
        if (url.searchParams.get("sort") === "name") return;

        url.searchParams.set("sort", "name");
        window.location.replace(url.toString());
    }

    function fixSort() {
        fixGitHubSort();
        fixVercelSort();
    }

    // 初次加载
    fixSort();

    // GitHub Turbo 导航监听
    document.addEventListener("turbo:load", fixSort);

})();
