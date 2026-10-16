<?php
// 定义蜘蛛的User-Agent关键词
/***
$spiders = [
    'Googlebot',        // 谷歌
    'Bingbot',          // 必应
    'Slurp',            // 雅虎
    'DuckDuckBot',      // DuckDuckGo
    'Baiduspider',      // 百度
    'YandexBot',        // Yandex
    'Sogou',            // 搜狗
    'Exabot',           // Exalead
    'facebot',          // Facebook
    'ia_archiver',      // Alexa
    'AhrefsBot',        // Ahrefs
    'MJ12bot',          // Majestic
    'Ezooms',           // Ezooms
    'YisouSpider',      // 神马搜索
    '360Spider',        // 360搜索
    'Bytespider',       // 字节跳动
    'DotBot',           // DotBot
    'SemrushBot',       // Semrush
    'ZoominfoBot',      // Zoominfo
    'CCBot',            // Common Crawl
];
**/
$spiders = [
    'Baiduspider', 'Baidubot', 'baiduboxapp', 'Baidu-YunGuanCe', 'Baidu-Mobile-UA',
    'Baidu-Image-Sider', 'Baidu-Video-Spider', 'Baidu-News-Spider', 'Baidu-TTS',
    'Baidu-SearchBox', 'Baidu-Site-App', 'Baidu-ADS', 'Baidu-Crawler', 'Baidu-SL',
    'Baidu-Transcoder', 'Baidu-Union', 'Baidu-Push', 'Baidu-Music', 'Baidu-Map',
    'Googlebot', 'Googlebot-Mobile', 'Googlebot-Image', 'Googlebot-News', 'Googlebot-Video',
    'AdsBot-Google', 'Mediapartners-Google',
    'bingbot', 'BingPreview', 'adidxbot', 'msnbot',
    'Sogou', 'Sogou web spider', 'Sogou News Spider', 'Sogou Image Spider',
    'Sogou Video Spider', 'Sogou Spider',
    '360Spider', '360Spider-Image', '360Spider-Video', '360Spider-News', '360Spider-Mobile',
    'toutiaospider', 'Bytespider',
    'YandexBot', 'DuckDuckBot', 'Slurp', 'Exabot', 'facebot', 'ia_archiver',
    'AhrefsBot', 'MJ12bot', 'Ezooms', 'YisouSpider', 'DotBot', 'SemrushBot', 'ZoominfoBot', 'CCBot'
];

// 获取访问者的User-Agent
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// 判断是否是蜘蛛访问
$isSpider = false;
foreach ($spiders as $spider) {
    if (stripos($userAgent, $spider) !== false) {
        $isSpider = true;
        break;
    }
}

// 获取Referer（来源网址）
$referer = $_SERVER['HTTP_REFERER'] ?? '';

// 判断是否应该跳转
$shouldRedirect = true;

// 不跳转的情况：
// 1. 是蜘蛛访问
// 2. 有Referer（无论来自本站还是其他网站）
if ($isSpider || $referer) {
    $shouldRedirect = false;
}

// 如果是直接访问首页（无Referer），则跳转到index.htm
if ($shouldRedirect) {
    header('Location: index.htm'); // 替换为你的指定页面URL
    exit();
} else {
    // 其他情况（蜘蛛访问、从外部或内部链接访问），返回index.php
    include('index.index.html'); // 假设帝国CMS生成的首页文件路径
}
?>