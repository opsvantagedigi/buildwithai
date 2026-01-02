$base='https://buildwithairedesign-lvtd3muxa-ajay-sidals-projects-132aa3d1.vercel.app'
$routes = @(
    '/',
    '/ai-website-builder',
    '/ecommerce-ai-builder',
    '/wordpress-ai-builder',
    '/features',
    '/pricing',
    '/templates',
    '/help-center',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/trust-center',
    '/templates/restaurant',
    '/templates/agency',
    '/templates/portfolio',
    '/templates/fitness',
    '/templates/real-estate',
    '/templates/photography',
    '/templates/coaching',
    '/templates/personal-brand',
    '/templates/ecommerce',
    '/compare/10web-vs-wix',
    '/compare/10web-vs-squarespace',
    '/compare/10web-vs-shopify',
    '/compare/ai-website-builders',
    '/docs/getting-started',
    '/docs/builder',
    '/docs/domains',
    '/docs/ai-generation',
    '/docs/templates',
    '/docs/publishing',
    '/docs/integrations',
    '/builder',
    '/builder/new',
    '/api/kv/health',
    '/api/domain/info?name=example.com',
    '/api/domain/rdap?name=example.com',
    '/api/domain/pricing?name=example.com'
)
foreach ($r in $routes) {
    $url = $base + $r
    try {
        $res = Invoke-WebRequest -Uri $url -UseBasicParsing -Method GET -TimeoutSec 30 -ErrorAction Stop
    } catch {
        Write-Host "$r => ERROR: $($_.Exception.Message)"
        continue
    }
    $status = $res.StatusCode
    $ct = $res.Headers['Content-Type']
    $len = ($res.Content).Length
    if ($res.Content -match '<title>(.*?)</title>') { $title = $matches[1].Trim() } else { $title='(no title)' }
    $warn = ''
    if ($res.Content -match 'data-gr-ext-installed|data-new-gr-c-s-check-loaded') { $warn += 'ext-attrs ' }
    if ($res.Content -match 'Hydration|hydration|Warning|ReactDOM') { $warn += 'hydrate-warning ' }
    $isJson = $false
    if ($ct -and $ct -match 'application/json') { $isJson = $true }
    if ($isJson) {
        try { $jsonPreview = $res.Content | ConvertFrom-Json -ErrorAction Stop; $jp = (ConvertTo-Json $jsonPreview -Depth 2); if ($jp.Length -gt 200) { $jp = $jp.Substring(0,200) } } catch { $jp='(invalid json)' }
    } else { $jp = '' }
    Write-Host "$r => $status | $ct | len=$len | title='$title' | warn=[$warn] $jp"
}
