import { auth } from '@/firebase.js';
import DAOService from "@/services/DAOService";
import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

const daoUser = new DAOService("user");
const daoShop = new DAOService("shop");

const userData = ref(null);

const fetchUserData = async (uid) => {
    try {
        const user = await daoUser.search('uid', uid);
        if (user && user.length > 0) {
            return { ...user[0], userType: 'individual' };  // Explicitly set userType for individuals
        }
        const shop = await daoShop.search('uid', uid);
        if (shop && shop.length > 0) {
            return { ...shop[0], userType: 'shop' };  // Explicitly set userType for shops
        }
        console.warn("Nenhum dado encontrado nas coleções user ou shop.");
        return null;
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return null;
    }
};

const initAuth = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userInfo = await fetchUserData(user.uid);
                userData.value = userInfo;
            } catch (error) {
                console.error("Erro ao processar autenticação:", error);
                userData.value = null;
            }
        } else {
            userData.value = null;
        }
    });
};

const isAuthenticated = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(!!user);
        });
    });
};

const hasAccess = (allowedTypes) => {
    if (!userData.value || !userData.value.userType) return false;
    return allowedTypes.includes(userData.value.userType);
};

export { userData, initAuth, isAuthenticated, hasAccess };