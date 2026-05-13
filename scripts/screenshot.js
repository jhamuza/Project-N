const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const BASE_URL = 'http://localhost:8787/';
const OUT = path.join(__dirname, '..', 'screenshots');
const WIDTH  = 1440;
const HEIGHT = 900;

// Map role → initials shown on the demo profile card in the login screen
const ROLE_INITIALS = {
  'supplier':        'NA',
  'team-lead':       'FR',
  'officer':         'RI',
  'recommender':     'AR',
  'verifier':        'HY',
  'approver':        'RZ',
  'content-manager': 'SN',
};

const ROLES = [
  {
    id: 'supplier',
    label: '01-Supplier',
    screens: [
      { key: 'dashboard',        label: '01-Dashboard' },
      { key: 'applications',     label: '02-My-Applications' },
      { key: 'sdoc-wizard',      label: '03-New-SDoC' },
      { key: 'special-approval', label: '04-Special-Approval' },
      { key: 'modification',     label: '05-Modification-Request' },
      { key: 'importation',      label: '06-Importation' },
      { key: 'certificates',     label: '07-Certificates' },
      { key: 'imei-register',    label: '08-Register-IMEI' },
      { key: 'payments',         label: '09-Payments' },
      { key: 'consultants',      label: '10-Consultants' },
      { key: 'onboarding',       label: '11-Supplier-Onboarding' },
      { key: 'notifications',    label: '12-Notifications' },
      { key: 'profile',          label: '13-Profile-Settings' },
    ],
  },
  {
    id: 'team-lead',
    label: '02-Team-Lead',
    screens: [
      { key: 'tl-dashboard',      label: '01-Dashboard' },
      { key: 'tl-review-list',    label: '02-Review-List' },
      { key: 'applications',      label: '03-All-Applications' },
      { key: 'suppliers-mgmt',    label: '04-Suppliers' },
      { key: 'pms',               label: '05-Post-Market-Surveillance' },
      { key: 'post-monitoring',   label: '06-Post-Monitoring' },
      { key: 'compliance-status', label: '07-Compliance-Status' },
      { key: 'sa-letter',         label: '08-SA-Letter' },
      { key: 'integrations',      label: '09-Integrations' },
      { key: 'admin-config',      label: '10-Configuration' },
      { key: 'reports',           label: '11-Reports-Analytics' },
      { key: 'audit',             label: '12-Audit-Log' },
      { key: 'profile',           label: '13-Profile-Settings' },
    ],
  },
  {
    id: 'officer',
    label: '03-Officer',
    screens: [
      { key: 'officer-dashboard',   label: '01-Dashboard' },
      { key: 'officer-review-list', label: '02-Review-List' },
      { key: 'suppliers-mgmt',      label: '03-Suppliers' },
      { key: 'pms',                 label: '04-Post-Market-Surveillance' },
      { key: 'post-monitoring',     label: '05-Post-Monitoring' },
      { key: 'compliance-status',   label: '06-Compliance-Status' },
      { key: 'integrations',        label: '07-Integrations' },
      { key: 'profile',             label: '08-Profile-Settings' },
    ],
  },
  {
    id: 'recommender',
    label: '04-Recommender',
    screens: [
      { key: 'rec-dashboard',   label: '01-Dashboard' },
      { key: 'rec-review-list', label: '02-Review-List' },
      { key: 'sa-letter',       label: '03-SA-Letter' },
      { key: 'profile',         label: '04-Profile-Settings' },
    ],
  },
  {
    id: 'verifier',
    label: '05-Verifier',
    screens: [
      { key: 'ver-dashboard',   label: '01-Dashboard' },
      { key: 'ver-review-list', label: '02-Review-List' },
      { key: 'sa-letter',       label: '03-SA-Letter' },
      { key: 'profile',         label: '04-Profile-Settings' },
    ],
  },
  {
    id: 'approver',
    label: '06-Approver',
    screens: [
      { key: 'app-dashboard',   label: '01-Dashboard' },
      { key: 'app-review-list', label: '02-Review-List' },
      { key: 'sa-letter',       label: '03-SA-Letter' },
      { key: 'reports',         label: '04-Reports-Analytics' },
      { key: 'profile',         label: '05-Profile-Settings' },
    ],
  },
  {
    id: 'content-manager',
    label: '07-Content-Manager',
    screens: [
      { key: 'cm-dashboard',     label: '01-Content-Dashboard' },
      { key: 'public-portal',    label: '02-Public-Portal' },
      { key: 'cm-announcements', label: '03-Announcements' },
      { key: 'cm-faq',           label: '04-FAQ-Help' },
      { key: 'profile',          label: '05-Profile-Settings' },
    ],
  },
];

async function waitForApp(page) {
  await page.waitForFunction(
    () => { const el = document.getElementById('loading'); return !el || el.style.display === 'none'; },
    { timeout: 20000 }
  );
  await page.waitForTimeout(800);
}

async function login(page, roleId) {
  // Clear session to force login screen
  await page.evaluate(() => {
    sessionStorage.removeItem('ncef.loggedIn');
    localStorage.removeItem('ncef.screen');
  });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForApp(page);

  const initials = ROLE_INITIALS[roleId];

  // Click the profile card that shows the role's initials
  await page.evaluate((ini) => {
    const spans = document.querySelectorAll('.ant-avatar, [class*="avatar"]');
    for (const el of spans) {
      if (el.textContent.trim() === ini) {
        // Walk up to the clickable container
        let target = el.parentElement;
        while (target && !target.onclick && target.tagName !== 'DIV') {
          target = target.parentElement;
        }
        // Climb to the profile card div (the one with onClick from React)
        for (let i = 0; i < 4; i++) {
          if (target && target.style && target.style.cursor === 'pointer') break;
          if (target) target = target.parentElement;
        }
        if (target) target.click();
        return;
      }
    }
  }, initials);

  await page.waitForTimeout(300);

  // Click the Sign In submit button
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button[type="submit"], button');
    for (const btn of buttons) {
      const t = (btn.textContent || btn.innerText || '').trim().toLowerCase();
      if (t.includes('sign') || t.includes('log in') || t.includes('login') || t.includes('masuk')) {
        btn.click();
        return;
      }
    }
  });

  // Wait for the app shell (sidebar) to appear = login succeeded
  await page.waitForSelector('.ant-layout-sider, [class*="sider"]', { timeout: 10000 });
  await page.waitForTimeout(1000);
}

async function navigateTo(page, screenKey) {
  await page.evaluate((key) => {
    const newHash = `#screen=${key}`;
    window.history.pushState(null, '', newHash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }, screenKey);
  await page.waitForTimeout(1500);
}

async function takeScreenshot(page, filePath) {
  await page.evaluate(() => {
    document.querySelectorAll('.ant-tooltip').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.ant-popover').forEach(el => el.style.display = 'none');
  });
  await page.screenshot({ path: filePath, fullPage: false });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  // Build offline-capable dist before screenshotting
  console.log('🔨 Building offline bundle…');
  execSync('LOCAL=1 node scripts/compile-bundle.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });

  // Serve dist/ on a local port
  const DIST = path.join(__dirname, '..', 'dist');
  const server = spawn('npx', ['http-server', DIST, '-p', '8787', '--cors', '-c-1', '--silent'], {
    cwd: path.join(__dirname, '..'),
    detached: false,
  });
  await new Promise(r => setTimeout(r, 1500)); // wait for server to start

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  let totalScreenshots = 0;

  // Screenshot the login screen first
  console.log('\n📸 Login screen');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForApp(page);
  await takeScreenshot(page, path.join(OUT, '00-Login.png'));
  totalScreenshots++;
  console.log('   ✓ 00-Login.png');

  for (const role of ROLES) {
    console.log(`\n🔑 Role: ${role.label}`);
    const roleDir = path.join(OUT, role.label);
    fs.mkdirSync(roleDir, { recursive: true });

    await login(page, role.id);

    for (const screen of role.screens) {
      await navigateTo(page, screen.key);
      const filename = `${screen.label}.png`;
      await takeScreenshot(page, path.join(roleDir, filename));
      totalScreenshots++;
      process.stdout.write(`   ✓ ${filename}\n`);
    }
  }

  await browser.close();
  server.kill();

  const totalRoles = ROLES.length;
  const totalScreens = ROLES.reduce((n, r) => n + r.screens.length, 0);
  console.log(`\n✅ Done — ${totalScreenshots} screenshots (${totalRoles} roles, ${totalScreens} screens + login)`);
  console.log(`\n📂 Screenshots saved to:\n   ${OUT}`);
  console.log('\n💡 To import into Figma:');
  console.log('   1. Open Figma → File → New design file');
  console.log('   2. Drag the entire "screenshots" folder onto the canvas');
  console.log('   3. Figma will import all PNGs, preserving folder grouping');
})();
