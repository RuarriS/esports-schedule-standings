import { css } from "lit-element";

export const rlcsxStyles = css`

:host {
  --orange: rgb(233,133,54);
  // --orange: #f49155;
}
/***** Animate-css ******/
:root {
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
  }
.animate__animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-duration: var(--animate-duration);
    animation-duration: var(--animate-duration);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }
  
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  .animate__slideInUp {
    -webkit-animation-name: slideInUp;
    animation-name: slideInUp;
  }



.rlcsx .learn-button-wrap .learn-button.orange {
	background: var(--orange);

}

.rlcsx .learn-button-wrap .learn-button {
	// margin: 5% 0 20%;
	-webkit-clip-path: polygon(10% 0,100% 0,90% 100%,0 100%);
	clip-path: polygon(10% 0,100% 0,90% 100%,0 100%);
}
.rlcsx .learn-button-wrap .learn-button.orange .learn-button-inner a {
	
}
.rlcsx .learn-button-wrap .learn-button .learn-button-inner a {
	font-family: "BourgeoisUltra","Arial Regular",Arial,sans-serif;
	font-weight: normal;
	font-size: 1em;
	text-transform: uppercase;
	line-height: 1.25;

    color: #FFF;

    text-decoration: none;
}

`;