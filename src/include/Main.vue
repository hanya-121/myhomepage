<template>
    <v-container id="main">
        <v-row>
            <v-col cols="12" class="sec1"></v-col>
        </v-row>
    </v-container>


    <!-- about section -->
    <v-container class="sec2" fluid id="about">
      <v-row class="about_content pa-0 " align="center" justify="center">
        <v-col cols="12" class="title sec2_title">About Me .</v-col>

        <v-col cols="12" md="5" class="about_imgbox">
              <v-img
              src="../assets/img/aboutme.png"
              alt="About me image"
              class="myphoto"
              cover
              />
        </v-col>

        <v-col cols="12" md="7" class="about_text">
          <h3 class="about_sub">Web Designer & Publisher</h3>
          <p>안녕하세요, 디자인과 퍼블리싱의 균형을 추구하는 최하얀 입니다.</p>
          <p>저는 보이는 아름다움과 보이지 않는 구조 모두에 진심을 담고, 사용자와의 연결을 우선합니다.</p>
          <p>사용자에게 자연스럽게 닿는 컨텐츠 경험을 만드는 퍼블리셔가 되겠습니다.</p>

          
          <!-- <v-btn
            class="more-btn"
            variant="outlined"
            rounded="pill"
            color="blue"
            size="small"
          >
            <v-icon start size="small">mdi-arrow-right</v-icon>
            More
          </v-btn> -->
        </v-col>

      </v-row>
    </v-container>


    <!-- skill section -->
    <v-container  class="sec3" fluid>
      <v-row dense justify="center" class="skill-grid">
        <v-col cols="12" class="sec3_title title">Skill .</v-col>
      
        <v-col
          v-for="(skill, index) in skills"
          :key="index"
          cols="6"
          sm="6"
          md="4"
          class="skill_card mx-1 my-1"
        >
          <v-card class="pa-8" elevation="2">
            <v-img 
              :src="skill.img" 
              alt="tool logo" 
              height="75" 
              contain 
              class="mb-4" 
            />
            <h3 class="tool-name text-center pb-5">{{ skill.name }}</h3>
            <p class="tool-desc text-center">{{ skill.desc }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


    <!-- project section -->
    <v-container class="sec4" fluid id="project">
      <v-row dense justify="center">
        <v-col cols="12" class="sec4_title title">Project .</v-col>

        <v-col
          v-for="(project, index) in projects"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="my-5 mx-4"
        >
          <v-card class="project-card" @click="selected = project">
            <v-img :src="project.thumbnail" height="320" cover />

            <v-card-title class="project_card_title">{{ project.title }}</v-card-title>

            <!-- tool 칩 출력 (배열 기반) -->
            <!-- <v-card-subtitle>
              <v-chip
                v-for="(item, i) in project.tool"
                :key="i"
                class="ma-1"
                color="blue"
                variant="outlined"
                text-color="blue-darken-3"
                size="small"
                label
              >
                {{ item }}
              </v-chip>
            </v-card-subtitle> -->

            <v-card-text class="project_card_text">{{ project.desc }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- ✅ 상세보기 다이얼로그 -->
      <v-dialog v-model="selected" max-width="600">
        <v-card v-if="selected">
          <v-card-title>{{ selected.title }}</v-card-title>

          <!-- 🔻 동영상/이미지 분기 렌더링 -->
          <div
            class="px-4 pt-2"
            v-if="selected.preview && (selected.preview.endsWith('.mp4') || selected.preview.endsWith('.png') || selected.preview.endsWith('.jpg'))"
          >
            <!-- mp4인 경우 -->
            <video
              v-if="selected.preview.endsWith('.mp4')"
              :src="selected.preview"
              controls
              playsinline
              preload="metadata"
              style="width: 100%; border-radius: 10px"
            ></video>

            <!-- 이미지인 경우 -->
            <v-img
              v-else
              :src="selected.preview"
              height="450"
              cover
              class="rounded"
            />
          </div>


          <v-card-text class="pa-4">{{ selected.detail }}</v-card-text>

          <!-- ✅ 팝업 내부 칩 출력 -->
          <v-card-text class="pa-4">
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="(item, i) in selected.tool"
                :key="'modal-' + i"
                class="ma-1"
                color="blue"
                variant="outlined"
                text-color="blue-darken-3"
                size="small"
                label
              >
                {{ item }}
              </v-chip>
            </div>
          </v-card-text>

          <v-card-text class="pa-4 text-center">
            <v-btn
              v-if="selected.preview && selected.preview.startsWith('http') && !selected.preview.endsWith('.png')"
              :href="selected.preview"
              target="_blank"
              color="blue"
              variant="tonal"
              class="mt-2"
            >
              사이트 보기
            </v-btn>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary" @click="selected = null">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>


    <!-- contact section -->
    <v-container id="contact" class="sec5" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" class="sec5_title title">Contact .</v-col>
        <v-col>
          <p class="contact contact_text">
            항상 더 나은 방향을 고민하며, 움직이겠습니다.
          </p>
          <span class="contact contact_email">chyva121@naver.com &nbsp;&nbsp; || &nbsp;&nbsp;</span>
          <span class="contact contact_mobile">010-4224-9988</span>
        </v-col>
      </v-row>
    </v-container>

</template>

<script setup>
import { ref } from 'vue'

// 스킬 상세 내용
import htmlImg from '../assets/img/html.png'
import css3Img from '../assets/img/css.png'
import bootstrapImg from '../assets/img/bt.png'
import vuetifyImg from '../assets/img/vf.png'
import figmaImg from '../assets/img/figma.png'
import photoshopImg from '../assets/img/ps.png'
import illustratorImg from '../assets/img/ai.png'
import aeImg from '../assets/img/ae.png'

const skills = [
  {
    name: 'HTML',
    img: htmlImg,
    desc: '시맨틱 마크업을 통한 구조적 웹페이지 제작',
  },
  {
    name: 'CSS3',
    img: css3Img,
    desc: '레이아웃, 반응형 디자인, 애니메이션 구현 ',
  },
  {
    name: 'Bootstrap',
    img: bootstrapImg,
    desc: '그리드 시스템 기반 빠른 UI 구성',
  },
  {
    name: 'Vuetify3',
    img: vuetifyImg,
    desc: 'Vue + Vuetify 조합 UI 프레임워크 활용',
  },
  {
    name: 'Figma',
    img: figmaImg,
    desc: '디자인 시안 제작 및 개발자와의 협업',
  },
  {
    name: 'Photoshop',
    img: photoshopImg,
    desc: '이미지 편집, 보정 및 웹용 리소스 제작',
  },
  {
    name: 'Illustrator',
    img: illustratorImg,
    desc: '아이콘, 벡터 그래픽 등 디지털 콘텐츠 제작',
  },
  {
    name: 'After Effects',
    img: aeImg,
    desc: '모션 그래픽 및 인터랙션 프로토타이핑',
  },
]


// 프로젝트 상세 내용
const selected = ref(null)

const projects = [
  {
    title: '카드뉴스 디자인',
    tool: ['Illustrator'],
    thumbnail: '/cardnews1.jpg',
    preview: '/cardnews21.png',
    desc: 'SNS용 카드뉴스 디자인 작업',
    detail: '브랜드 컬러와 톤앤매너를 고려한 5컷 구성 카드뉴스 디자인입니다.',
  },
  {
    title: '모바일 앱 디자인',
    tool: ['Photoshop'],
    thumbnail: '/mobile_app1.png',
    preview: '/mobile_app2.png',
    desc: 'UI/UX를 고려한 앱 디자인',
    detail: '메인화면, 메뉴 구조, 리스트 등의 화면을 직관적으로 구성하였습니다.',
  },
  {
    title: '브랜드 홍보 영상',
    tool: ['After Effects'],
    thumbnail: '/subway_pc.png',
    preview: 'https://yeon-11.github.io/subway-advertising/',
    desc: '모션 그래픽을 활용한 영상 콘텐츠',
    detail: '브랜드에서 추구하는 가치를 일러스트 및 모션 그래픽을 활용하여 제작하였습니다.',
  },
  {
    title: '안테나뮤직 웹사이트 리디자인',
    tool: ['HTML', 'Bootstrap'],
    thumbnail: '/antenna_pc.png',
    preview: 'https://leejinhee1106.github.io/antenna_html/',
    desc: '시맨틱 마크업 기반 홈페이지 구조 리빌딩',
    detail: '접근성과 구조 중심으로 HTML 마크업을 재정비한 프로젝트입니다.',
  },
  {
    title: '미드림성형외과 웹사이트 리디자인',
    tool: ['Vuetify'],
    thumbnail: '/meedream_pc.png',
    preview: 'https://yeon-11.github.io/meedream-redesign/',
    desc: 'Vuetify로 구성한 반응형 포트폴리오 웹',
    detail: 'Vuetify3 구성요소를 활용하여 반응형 웹사이트를 제작한 프로젝트입니다.',
  },
]

</script>

<style>
@import '@/styles/_Main.scss';
</style>