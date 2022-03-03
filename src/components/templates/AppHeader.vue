<template>
  <div class="card mb-2">
    <div class="app__header columns mb-2">
      <div class="column col-3">
        <img
          src="../../../public/logo-currency.png"
          class="img-responsive m-2"
          alt="img"
        />
      </div>
      <div class="column col-9">
        <h1 class="main-title text-warning text-left text-bold text-italic p-2 m-0"> 
          Currency</h1>
      </div>
    </div>
  </div>
</template>                      


<style>
.app__header {
  align-items: flex-end;
}

/*Responsive*/
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem !important;
  }
}
</style>