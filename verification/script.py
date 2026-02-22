from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 400, "height": 800}) # Mobile-ish viewport
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))
        
        response = page.goto("http://localhost:5173/")
        if response:
             print(f"Response: {response.status}")
        
        page.wait_for_timeout(3000)
        page.screenshot(path="verification/screenshot.png")
        browser.close()

if __name__ == "__main__":
    run()
