import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCartStore } from "../cart";
import { useWishList } from "../wishList";

 export const useAuthStore = defineStore('auth', ()=>{
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(
    JSON.parse(localStorage.getItem('user')) || null
  );

const isLogged = computed(() => !!token.value);

    function SetToken(newToken){
    token.value = newToken;
    localStorage.setItem('token' , newToken);
}
function SetUser(newUser){
  user.value = newUser;
  localStorage.setItem('user', JSON.stringify(newUser));
}


function signOut(){
  token.value = null
  user.value = null
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const cartStore = useCartStore();
    cartStore.resetCart();

  const wishlistStore = useWishList(); 
  wishlistStore.resetWhishList();
}

    return{
    token,
    user,
    SetToken,
    SetUser,
    isLogged,
    signOut
    }
})