const {chromium}=require('C:/Users/pollee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173');
 await page.waitForSelector('.card');
 if(await page.locator('.card').count()!==30)throw Error('Expected 30 demos');
 await page.screenshot({path:'preview-desktop.png',fullPage:true});
 const ids=await page.locator('.card').evaluateAll(els=>els.map(e=>e.dataset.demo));
 const results=[];
 for(const id of ids){
  await page.locator(`[data-demo="${id}"]`).click();
  await page.waitForSelector('#demo-dialog[open]');
  if(await page.locator('#demo-body .error').count())throw Error(id+': initial error '+await page.locator('#demo-body').innerText());
  const run=page.locator('#demo-body #run');
  if(await run.count())await run.click();
  await page.waitForTimeout(100);
  if(id==='alert'){await page.locator('.swal2-confirm').click()}
  if(id==='sort'){await page.locator('#sort-list [data-move="1"]').first().click();if(!(await page.locator('#out').innerText()).startsWith('1. 화면 설계'))throw Error('Sort failed')}
  if(id==='picker'){await page.locator('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').nth(3).click();await page.locator('.flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').nth(7).click();if(!(await page.locator('#out').innerText()).includes('총 5일'))throw Error('Range failed')}
  if(id==='csvexport'){const download=page.waitForEvent('download');await page.locator('#download').click();await download}
  if(await page.locator('#demo-body .error').count())throw Error(id+': execution error '+await page.locator('#demo-body').innerText());
  results.push({id,status:'pass'});
  await page.locator('#close-dialog').click();
 }
 await page.locator('#search').fill('chart');if(await page.locator('.card').count()!==3)throw Error('Search failed');
 await page.locator('#search').fill('zzzzzzzzzzz');if(!await page.locator('#empty').isVisible())throw Error('Empty state failed');
 await page.locator('#reset-search').click();await page.locator('#categories [data-category="날짜 & 시간"]').click();if(await page.locator('.card').count()!==3)throw Error('Category failed');
 await page.locator('#categories [data-category="전체"]').click();
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'preview-mobile.png',fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow');
 await page.locator('[data-demo="math"]').click();await page.locator('#text').fill('sqrt(144) + 2^3');await page.locator('#run').click();if(await page.locator('#out').innerText()!=='= 20')throw Error('Math result failed');
 await page.locator('#close-dialog').click();
 await page.goto('file:///'+process.cwd().replace(/\\/g,'/')+'/index.html');await page.waitForSelector('.card');await page.locator('[data-demo="qr"]').click();if(await page.locator('#qr img').count()!==1)throw Error('File URL failed');
 if(errors.length)throw Error(errors.join('\n'));
 fs.writeFileSync('verification.json',JSON.stringify({demos:results,search:'pass',categories:'pass',mobile:'pass',directFile:'pass',consoleErrors:errors},null,2));
 console.log('PASS: 30 demos, search, categories, CSV download, dates, mobile, direct file; no browser errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
