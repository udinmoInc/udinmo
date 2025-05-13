// animations.ts (or wherever you define your animations)

export const blurPopUp = {
	initial: {
	  opacity: 0,
	  y: '20%',
	},
	animate: {
	  opacity: 1,
	  y: 0,
	  transition: {
		opacity: { duration: 0.7 },
		y: { delay: 1, duration: 1 },
	  },
	},
  }
  
  export const illustrate = {
	initial: {
	  opacity: 0,
	  x: 50,
	  y: -50,
	  z: 300,
	  filter: 'blur(10px)', // Starts with blur
	},
	animate: {
	  opacity: 1,
	  filter: 'blur(0px)', // Ensures blur goes to 0px
	  x: 0,
	  y: 0,
	  z: 0,
	  transition: {
		opacity: { duration: 0.5 },
		filter: {
		  duration: 0.7, // Duration for blur transition
		  ease: 'easeOut',
		},
		x: { duration: 0.6 },
		y: { duration: 0.6 },
		z: { duration: 0.6 },
	  },
	},
  }
  