<!-- <script src="/assets/js/drag.js" type="text/javascript"></script> -->
<script>
  import FloatingCard from '$lib/floating-card.svelte';
  /* dragElement(document.getElementById('presentation')); */
</script>

<svelte:head>
  <title>Alessandro Candido</title>
</svelte:head>

<div id="bkg">
  <video autoplay muted loop>
    <source src="/bkg/mountain-river.mp4" type="video/mp4" />
  </video>
</div>

<main>
  <FloatingCard>
    <figure id="profpic">
      <img src="/profile.jpg" alt="Profile" />
    </figure>

    <header id="titles">
      <h1 class="title">Hi, I'm Alessandro</h1>
      <h2 class="subtitle">Welcome to my personal page</h2>
    </header>
    <p>I'm Alessandro Candido, a PhD student in theoretical physics working in HEP.</p>
  </FloatingCard>
</main>

<style>
  #bkg {
    position: absolute;
    top: 0;
    z-index: -100;

    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  main {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  #profpic {
    width: 128px;

    margin: 0 1rem 0 2rem;
  }

  #profpic > img {
    width: 100%;
    border-radius: 50%;
  }

  #titles {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1rem;
  }
</style>
