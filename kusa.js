let fs = require("fs");
require("chromedriver");
let swd = require("selenium-webdriver"),
util = require('util');

let request = require("request");

let cheerio = require('cheerio')


let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let url = "https://itch.io/";

let log = console.log;

(async function () {
    try {
        
        await driver.get(url);

        //await (await driver.findElement(swd.By.css(".github_login_btn"))).click();

        //let unInputWillBeFoundPromise = driver.findElement(swd.By.css("#login_field"));
        //let psInputWillBeFoundPromise = driver.findElement(swd.By.css("#password"));
        //let unNpsEl = await Promise.all([unInputWillBeFoundPromise, psInputWillBeFoundPromise]);
        //let uNameWillBeSendPromise = unNpsEl[0].sendKeys("daspusekka@enayu.com");
        //let pWillBeSendPromise = unNpsEl[1].sendKeys("thisistemppass202020");
        //await Promise.all([uNameWillBeSendPromise, pWillBeSendPromise]);
        //let loginBtn = await driver.findElement(swd.By.css("input[value='Sign in']"));
        //await loginBtn.click();


        let jamBtn = await driver.findElement(swd.By.css(".jams_btn"));
        await jamBtn.click();
        
        let AllJams = "====";

        await driver.findElement(swd.By.linkText("Explore All Jams")).click();
        let adminPageUrl = "";
        await driver.findElements(swd.By.className("primary_info")).then( function(elements){
            elements.forEach( function (element) {
                element.getText().then( function(text){
                    AllJams+=text;
                    log(text);
                });
                //element.click();
            }).catch(function(){
                elements[0].click();
            })
            //log(AllJams);
            elements[0].click();
            //adminPageUrl = elements[0].getAttribute("href");
            
        });

        log("----------------------");
        
        //await driver.get(adminPageUrl);
        ///let el = await driver.findElement(swd.By.className('date_data'));
        //await driver.wait(swd.until.elementLocated(el),5000);

        //let t = await driver.getCurrentUrl();
        //log(t)

        //let scrUrl = "https://itch.io/jam/gmtk-2020";
        //scrapping
        /*request(url, function (err, res, html) {
            if (err === null && res.statusCode === 200) {
                parseIt(html)    
            } else if (res.statusCode === 404) {
                console.log("Invalid URL");
            } else {
                console.log(err);
                console.log(res.statusCode);
            }
        })*/
        
        
        
        

    }catch(err){
        log(err);
    }
})()


function parseIt(html){
    let d = cheerio.load(html);
    let title = d("a[href='/jam/gmtk-2020']")
    log(title.text()+"");
    let subf = d(".text-center")
    log(subf.text());
    d('.date_format span').each(function(i, elm) {
        console.log(d(elm).text())  
    });
    
       
}
