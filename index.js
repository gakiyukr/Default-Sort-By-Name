// ==UserScript==
// @name         Default Sort By Name
// @namespace    https://tampermonkey.net/
// @version      2.4
// @description  Automatically sort supported website lists by name
// @match        https://github.com/*
// @match        https://vercel.com/*
// @match        https://dash.cloudflare.com/*
// @updateURL    https://cdn.jsdelivr.net/gh/gakiyukr/Default-Sort-By-Name@main/index.js
// @downloadURL  https://cdn.jsdelivr.net/gh/gakiyukr/Default-Sort-By-Name@main/index.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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
        // 自动匹配任意团队路径：/{teamSlug}
        if (!/^\/[^/]+\/?$/.test(url.pathname)) return;
        if (url.searchParams.get("sort") === "name") return;

        url.searchParams.set("sort", "name");
        window.location.replace(url.toString());
    }

    function fixCloudflareSort() {
        const url = new URL(window.location.href);

        if (url.hostname !== "dash.cloudflare.com") return;
        // 自动匹配任意账号 ID：/{accountId}/workers-and-pages
        if (!/^\/[^/]+\/workers-and-pages\/?$/.test(url.pathname)) return;
        if (url.searchParams.get("sortBy") === "name") return;

        url.searchParams.set("sortBy", "name");
        window.location.replace(url.toString());
    }

    function fixSort() {
        fixGitHubSort();
        fixVercelSort();
        fixCloudflareSort();
    }

    // 初次加载
    fixSort();

    // GitHub Turbo 导航监听
    document.addEventListener("turbo:load", fixSort);

})();
