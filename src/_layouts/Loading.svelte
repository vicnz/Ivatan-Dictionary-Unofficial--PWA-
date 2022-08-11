<!-- note this is some shit i want to emulate a timer or some thing -->
<script>
</script>

<div class="content-wrapper">
    <div class="wrapper h-full w-full" style="display:grid;place-items:center">
        <div class="card border-0 bg-transparent text-center">
            <img
                src="/favicon.png"
                alt="page-logo"
                class="img"
                style="max-height: 25vh;"
            />
            <h3>Ivatan Dictionary</h3>
            <p>
                Initializing Dictionary Data, This may take several second(s) or
                a minute(s) depending on your connection...
            </p>
        </div>
    </div>
</div>

<style>
    @keyframes -global-pulse-animation {
        0% {
            transform: rotateY(0deg);
        }
        20% {
            transform: rotateY(-25deg);
        }
        40% {
            transform: rotateY(0deg);
        }
        80% {
            transform: rotateY(25deg);
        }
        100% {
            transform: rotateY(0deg);
        }
    }
    .img {
        animation: pulse-animation 3s ease-out infinite;
    }
</style>
