<template>
  <v-app-bar flat elevation="1" color="white" class="custom-app-bar">

    <!-- 👇 네비 만들 때 재 사용
    
    ✅ 햄버거 메뉴 (모바일만 표시)
    <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
    ></v-app-bar-nav-icon> 
    
    -->


    <!-- 로고 -->
    <div class="logo"></div>

    <!-- 가운데 버튼 4개 -->
    <div class="nav-center">
    <v-btn
        v-for="section in sections"
        :key="section.id"
        text
        class="nav-btn"
        rounded
        @click="scrollToSection(section.id)"
    >
        {{ section.label }}
    </v-btn>
    </div>

    <!-- 👇 네비 만들 때 재 사용
    
    가운데 네비게이션
    <div class="nav-center d-none d-md-flex">
    <v-btn
        v-for="item in navItems"
        :key="item.title"
        text
        class="nav-btn"
        @click="navigate(item.link)"
    >
        {{ item.title }}
    </v-btn>
    </div>

    <v-spacer />


    ✅ 모바일 네비게이션 
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        width="100%"
        absolute
        class="mobile-drawer d-md-none"
    >
        닫기 버튼 
        <div class="drawer-header">
            <v-btn icon @click="drawer = false">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        메뉴 리스트 
        <v-list nav dense>
            <v-list-item
            v-for="item in navItems"
            :key="item.title"
            :title="item.title"
            @click="navigate(item.link)"
            />
        </v-list>
    </v-navigation-drawer>
    
    -->

  </v-app-bar>
</template>

<script setup>

import { onMounted } from 'vue'

const sections = [
  { id: 'main', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'project', label: 'Project' },
  { id: 'contact', label: 'Contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}


// 👇 네비 만들 때 재 사용

// import { ref } from 'vue'
// import { useRouter } from 'vue-router';

// // ✅ 햄버거 버튼
// const drawer = ref(false)

// // ✅ 라우터
// const router = useRouter()

// function navigate(link) {
//   router.push(link)
//   drawer.value = false
// }

// function navigateAndClose(link) {
//   drawer.value = false
//   router.push(link)
// }


// const navItems = ref([
//     {title:'Main', link:'/'},
//     {title:'About Me', link:'/about'},
//     {title:'Project', link:'/project'},
//     {title:'Contact', link:'/contact'},
// ])
</script>

<style scoped>

.custom-app-bar {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.03);
}

.logo {
    width: 60px;
    height: 60px;
    background: url(../assets/img/logo.png) no-repeat center center/cover;
    cursor: pointer;
}

.nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 32px;
}

.nav-btn {
    font-weight: 500;
    font-size: 16px;
    color:#0074D0;
    text-transform: none;
    margin-right: 30px;
}

.section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
}


/* 👇 네비 만들 때 재 사용

.custom-app-bar {
    padding: 0 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
}

.logo {
    width: 60px;
    height: 60px;
    background: url(../assets/img/logo.png) no-repeat center center/cover;
    cursor: pointer;
}

.nav-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 32px;
}

.nav-btn {
    font-weight: 500;
    font-size: 14px;
    text-transform: none;
    color: #222;
}

/* ✅ 모바일 drawer 
.mobile-drawer {
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

.drawer-header {
    display: flex;
    justify-content: flex-end;
    padding: 12px;
}

.drawer-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48px;
    gap: 24px;
}

.drawer-btn {
    font-size: 18px;
    font-weight: 500;
    color: #333;
}

*/
</style>
