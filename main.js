const PARSER = new DOMParser()

addEventListener("hashchange", loadContent)
addEventListener("load", loadContent, {passive:true, once: true})
document.getElementById("contact").addEventListener("mouseover", addContact, { once: true })

async function loadContent(ev = undefined) {
    let content = location.hash?.slice(1) || "profile"
    let data = await fetch(`pages/${content}.html`)
    let dom = PARSER.parseFromString(await data.text(), "text/html")
    document.title = dom.title
    document.getElementById("content").replaceChildren(...dom.body.children)
}

function addContact(ev) {
    let r = dec([114, 126, 127, 101, 112, 114, 101, 81, 127, 126, 114, 114, 100, 63, 112, 99, 101])
    let m = dec([124, 112, 120, 125, 101, 126, 43])
    ev.target.href = `${m}:${r}`
}

function enc(x) {
    let o = []
    for (c of x) {
        o.push(c.charCodeAt() ^ 17)
    }
    return o
}

function dec(x) {
    let o = ""
    for (c of x) {
        o += String.fromCharCode(c ^ 17)
    }
    return o
}
