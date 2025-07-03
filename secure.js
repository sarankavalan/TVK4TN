function createElement(str) {
    var frag = document.createDocumentFragment();
    var elem = document.createElement('div');
    elem.innerHTML = str;
    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}

var beep = (function () {
    var ctxClass = window.audioContext || window.AudioContext || window.AudioContext || window.webkitAudioContext
    var ctx = new ctxClass();
    return function (duration, type, finishedCallback) {
        duration = +duration;
        type = (type % 5) || 0;
        if (typeof finishedCallback != "function") {
            finishedCallback = function () {};
        }

        var osc = ctx.createOscillator();
        osc.type = type;
        osc.connect(ctx.destination);
        if (osc.noteOn) osc.noteOn(0);
        if (osc.start) osc.start();

        setTimeout(function () {
            if (osc.noteOff) osc.noteOff(0);
            if (osc.stop) osc.stop();
            finishedCallback();
        }, duration);
    };
})();

function converttomilli(dur,type) {
    if (type=='sec') dur=dur*1000;
    else if (type=='min') dur=dur*60*1000;
    else if (type=='hr') dur=dur*60*60*1000;
    else if (type=='day') dur=dur*24*60*60*1000;
    return dur;
}

function random_between(interval,interval2) {
    return Math.floor(Math.random()*(interval2-interval+1)+interval);
}

function get_links(){
    var links=document.querySelectorAll('[data-testid="retweet"]');
    var allinks=[];
    var button_links=[];
    for (i = 0; i < links.length; i++) {
        allinks.push(links[i]);
        button_links.push(links[i]);
        if (i == links.length-1 || button_links.length==sd_numberofclicks)     
            return [button_links,allinks];
    }    
}

function deletelinks(links) {
    for (i = 0; i < links.length; i++) {
        links[i].remove();
    }
}

var sd_min_interval=converttomilli(0,'sec');
var sd_max_interval=converttomilli(1,'sec');
var sd_numberofclicks=9;
var sd_no_of_errs=0;
var totalcount=0;

function click_links(links,deletelinksvar){
    if(links.length==0)
        deletelinks(deletelinksvar);
    for (i = 0; i < links.length; i++) {
        links[i].scrollIntoView();
        links[i].click();
        try{
            setTimeout(function(){
                document.querySelector('[data-testid="retweetConfirm"]').click();
            },random_between(100,1000));
        }catch(e){}
        sd_no_of_errs=0;
        if (i == links.length-1) {
            totalcount=totalcount+links.length;
            document.getElementById('igcnt').innerText= totalcount;
            deletelinks(deletelinksvar);
        }
    }
}

function main_func(){
    try{
        if(totalcount>sd_max_clicks_per_action) {
            alert('You are not permitted by developer. Contact @SaranKavalan');
            return;
        }
        var mainlinks=get_links();
        var actionlinks=mainlinks[0];
        var deletelinksvar=mainlinks[1];
        click_links(actionlinks,deletelinksvar);
        setTimeout(function(){return main_func()}, random_between(sd_min_interval,sd_max_interval));
    }
    catch(e){
        sd_no_of_errs=sd_no_of_errs+1;
        window.scrollTo(0,document.body.scrollHeight);
        if(sd_no_of_errs>=6)
            beep(900, 2, function(){});
        setTimeout(function(){return main_func()}, random_between(sd_min_interval,sd_max_interval));
    }
}	

function addcountwidget(){  
    // Create the hacker-style popup
    var hackerPopup = createElement(`
    <div align="center" style="
        z-index: 2000;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        background: #0a0a12;
        border: 1px solid #00ff41;
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
        padding: 15px;
        width: 300px;
        height: 150px;
        font-family: 'Courier New', monospace;
        overflow: hidden;
        animation: glitch 1s linear infinite;
    ">
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 255, 65, 0.1),
                rgba(0, 255, 65, 0.1) 1px,
                transparent 1px,
                transparent 5px
            );
            pointer-events: none;
        "></div>
        
        <div style="
            position: relative;
            z-index: 2;
            border: 1px solid #00ff41;
            padding: 10px;
            height: 100%;
            background: rgba(10, 10, 18, 0.9);
        ">
            <div style="
                color: #00ff41;
                font-size: 16px;
                text-shadow: 0 0 5px #00ff41;
                margin-bottom: 10px;
                border-bottom: 1px dashed #00ff41;
                padding-bottom: 5px;
            ">
                ⚡ RETWEET BOT v3.1.4 ⚡
            </div>
            
            <div style="
                color: #00ff41;
                font-size: 12px;
                margin-bottom: 5px;
                text-align: left;
            ">
                <span style="color: white;">STATUS:</span> <span id="status-indicator">DEPLOYING</span>
            </div>
            
            <div style="
                color: #00ff41;
                font-size: 12px;
                margin-bottom: 5px;
                text-align: left;
            ">
                <span style="color: white;">DEVELOPER:</span> ☬ SaranKavalan
            </div>
            
            <div style="
                color: #00ff41;
                font-size: 12px;
                margin-bottom: 15px;
                text-align: left;
            ">
                <span style="color: white;">TARGET:</span> TWITTER.COM
            </div>
            
            <div style="
                font-size: 32px;
                font-family: 'Courier New', monospace;
                color: #00ff41;
                text-shadow: 0 0 10px #00ff41;
                letter-spacing: 2px;
                animation: pulse 0.5s infinite alternate;
            " id="igcnt">0</div>
            
            <div style="
                position: absolute;
                bottom: 5px;
                right: 5px;
                font-size: 10px;
                color: rgba(0, 255, 65, 0.5);
                font-family: 'Courier New', monospace;
            " id="random-code">
                ${Math.random().toString(16).substr(2, 8).toUpperCase()}
            </div>
        </div>
        
        <style>
            @keyframes glitch {
                0%, 100% { transform: translate(-50%, -50%); }
                20% { transform: translate(-51%, -50%) skewX(5deg); }
                40% { transform: translate(-49%, -50%) skewX(-5deg); }
                60% { transform: translate(-50%, -51%); }
                80% { transform: translate(-50%, -49%); }
            }
            
            @keyframes pulse {
                from { opacity: 0.7; text-shadow: 0 0 5px #00ff41; }
                to { opacity: 1; text-shadow: 0 0 15px #00ff41, 0 0 20px #00ff41; }
            }
            
            @keyframes scanline {
                from { transform: translateY(-100%); }
                to { transform: translateY(100%); }
            }
        </style>
        
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0, 255, 65, 0.05) 50%,
                transparent 100%
            );
            animation: scanline 4s linear infinite;
            pointer-events: none;
            z-index: 3;
        "></div>
    </div>
    `);

    document.body.appendChild(hackerPopup);
    
    // Add animation for random code
    setInterval(() => {
        var codeElement = document.getElementById('random-code');
        if (codeElement) {
            codeElement.innerText = Math.random().toString(16).substr(2, 8).toUpperCase();
        }
        
        // Blink status indicator
        var status = document.getElementById('status-indicator');
        if (status) {
            status.style.visibility = status.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }
    }, 1500);
}

var sd_max_clicks_per_action=5900;
var num_of_clicks=0;

function getalljson(type){
    try{	
        chrome.storage.local.get({sd_options_storage:'{}'}, function(result) {
            var obj=JSON.parse(result.sd_options_storage);
            sd_min_interval=converttomilli(obj['sd_'+type+'_min'],'sec');
            sd_max_interval=converttomilli(obj['sd_'+type+'_max'],'sec');
            sd_numberofclicks=parseInt(obj['sd_'+type+'_rate']);
            if(parseInt(obj['sd_'+type+'_per_action'])<parseInt(Math.PI.toString().substring(8, 9)))
                sd_max_clicks_per_action=parseInt(obj['sd_'+type+'_per_action']);
            else
                sd_max_clicks_per_action=parseInt(Math.PI.toString().substring(8, 9));
        });
    }catch(e){}
}

getalljson('retweet');
addcountwidget();
setTimeout(function(){return main_func()}, 5000);

// ================= VIDEO REMOVAL SCRIPT =================
HTMLVideoElement.prototype.play = function() {
    console.log("🚫 play() blocked");
    return Promise.resolve();
};

const removeVideoFast = (node) => {
    node.querySelectorAll('video').forEach(v => {
        v.pause();
        v.removeAttribute('src');
        v.preload = 'none';
        v.load();
        const playerWrapper = v.closest('div.css-175oi2r.r-9aw3ui.r-1s2bzr4') || v.parentElement;
        if (playerWrapper && playerWrapper !== document.body) {
            playerWrapper.remove();
            console.log('✅ Removed player container');
        } else {
            v.remove();
            console.log('✅ Removed video element');
        }
    });
};

const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
        m.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.querySelectorAll) {
                removeVideoFast(node);
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });
removeVideoFast(document);

// ================= NEW MEDIA REMOVAL CODE =================
document.querySelectorAll('.css-175oi2r.r-9aw3ui.r-1s2bzr4').forEach(el => el.remove());

const mediaObserver = new MutationObserver(mutations => {
    mutations.forEach(m => {
        m.addedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
            if (node.classList.contains('css-175oi2r') &&
                node.classList.contains('r-9aw3ui') &&
                node.classList.contains('r-1s2bzr4')) {
                node.remove();
                return;
            }
            node.querySelectorAll('.css-175oi2r.r-9aw3ui.r-1s2bzr4').forEach(el => el.remove());
        });
    });
});

mediaObserver.observe(document.body, { childList: true, subtree: true });