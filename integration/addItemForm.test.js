describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:6006/iframe.html?id=todolist-additemform--add-item-form-story',
      {waitUntil: "networkidle2"});

    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

// написать yarn run jest:integration --updateSnapshot для того чтобы применить изменения и сделать новый образец снимка