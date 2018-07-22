import {NAME} from './myval.js';
import './style.css'
import pic from './images/logo.gif';
console.log(NAME);
window.addEventListener('DOMContentLoaded',
	function(){
		let img = new Image();
		img.src = pic;
		document.body.appendChild(img);
	},false);