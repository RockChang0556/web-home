<template>
	<div class="home">
		<global-header :user="currentUser"></global-header>
		<header>
			<h1>Welcome to my world</h1>
			<p>这里是我的个人站, 不一定有什么内容</p>
		</header>
		<main>
			<ul class="cards">
				<li class="card red">
					<div class="card--image">✤</div>
					<h2>Red</h2>
					<p>
						Red is the color at the long wavelength end of the visible spectrum
						of light, next to orange and opposite violet.
					</p>
				</li>
				<li class="card green">
					<div class="card--image">✦</div>
					<h2>Green</h2>
					<p>
						Green is the color between blue and yellow on the visible spectrum.
						It is evoked by light which has a dominant wavelength of roughly
						495–570 nm.
					</p>
				</li>
				<li class="card blue">
					<div class="card--image">❖</div>
					<h2>Blue</h2>
					<p>
						Blue is one of the three primary colours of pigments in painting and
						traditional colour theory, as well as in the RGB colour model. It
						lies between violet and green on the spectrum of visible light.
					</p>
				</li>
			</ul>
		</main>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import GlobalHeader from '@/components/layout/header.vue';
export default defineComponent({
	name: 'home',
	components: { GlobalHeader },
	props: {},
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.state.user.userInfo);

		return {
			currentUser,
		};
	},
});
</script>

<style lang="less">
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.home {
	width: 100%;
	height: 200vh;
	padding: 1rem;
	font-family: Avenir, sans-serif;
	font-size: 112.5%;
	color: #124;
	background-image: radial-gradient(rgba(red, 0.3), rgba(red, 0) 40vw),
		radial-gradient(rgba(green, 0.3), rgba(green, 0) 40vw),
		radial-gradient(rgba(blue, 0.3), rgba(blue, 0) 40vw),
		radial-gradient(rgba(yellow, 0.3), rgba(yellow, 0) 40vw),
		radial-gradient(rgba(red, 0.3), rgba(red, 0) 40vw);
	background-position: -40vw 14rem, 50% 10rem, 60vw 14rem,
		-10vw calc(14rem + 20vw), 30vw calc(14rem + 20vw);
	background-size: 80vw 80vw;
	background-repeat: no-repeat;
	background-color: #fff;

	header {
		max-width: 600px;
		margin: 24vh auto;
	}

	h1 {
		font-size: 3.2rem;
		font-weight: 900;
		line-height: 1.1;

		+ p {
			margin-top: 1rem;
		}
	}

	main {
		max-width: 800px;
		margin-right: auto;
		margin-left: auto;
	}

	.cards {
		display: flex;
		flex-direction: column;
		margin: -1rem;
		list-style: none;

		@media (min-width: 600px) {
			flex-direction: row;
		}
		.card {
			flex: 1;
			margin: 1rem;
			padding: 1rem;
			background-color: white;
			border-radius: 0.5rem;
			box-shadow: 0 0 6rem rgba(black, 0.1);

			* {
				margin-bottom: 1rem;
			}
			&.red .card--image {
				color: mix(red, white);
			}
			&.green .card--image {
				color: mix(green, white);
			}
			&.blue .card--image {
				color: mix(blue, white);
			}
			.card--image {
				font-size: 6rem;
				line-height: 1;
			}
		}
	}
}
</style>
