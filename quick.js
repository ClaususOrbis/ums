// <script src="{{ '/quick.js' | relative_url }}"></script>

function addCopyButton() {
    let cb = document.querySelector('code'),
		hmain = cb.parentNode,
		newbtn = document.createElement('btn'),
		styles = document.createElement('style');
		
	newbtn.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>`;
    newbtn.classList.add('copy-button');
	
	styles.textContent = `
		pre.highlight:has(code) {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 14.4px;
		}
		pre.highlight > code {
			flex: 1 0 auto;
			margin-right: 36px;
		}
		pre.highlight > btn {
			line-height: 0;
			fill: white;
			position: absolute;
			right: 4.2px;
			cursor: pointer;
			transition: fill .1s linear;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		pre.highlight > btn:hover {
			background: #fff1;
			border-radius: 100%;
		}
		pre.highlight > btn > svg {
			height: 16px;
			width: 16px;
			padding: 14.4px;
		}
		pre.highlight > btn[class*="green"] {
			fill: #22c55e;
		}
		pre.highlight > btn[class*="red"] {
			fill: #f50a0a;
		}
	`;
	
	hmain.appendChild(newbtn);
	hmain.appendChild(styles);
}

async function copyStringToClipboard(textToCopy) {
	let cpybtn = document.querySelector('.copy-button'),
		dateNow = Date.now();

	try {
		await navigator.clipboard.writeText(textToCopy);
		cpybtn.classList.add(`green-${dateNow}`);
		setTimeout(() => {
			cpybtn.classList.remove(`green-${dateNow}`);
		}, 800);
	} catch (err) {
		cpybtn.classList.add(`red-${dateNow}`);
		setTimeout(() => {
			cpybtn.classList.remove(`red-${dateNow}`);
		}, 800);
		throw err;
	}
}

addCopyButton();

document.addEventListener('click', (e) => {
	if (e.target.closest('.copy-button')) {
		copyStringToClipboard(document.querySelector('code').textContent.replace(/\n/g,''));
	}
});