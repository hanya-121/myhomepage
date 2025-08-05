<template>
    <!-- <v-container id="main">
        <v-row>
            <v-col cols="12" class="sec1"></v-col>
        </v-row>
    </v-container> -->


    <!-- 어바웃 섹션 -->
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
          <h3 class="about_sub">Web Designer</h3>
          <p>안녕하세요, 디자인과 퍼블리싱의 균형을 추구하는 <strong>최하얀</strong> 입니다.</p>
          <p>저는 보이는 아름다움과 보이지 않는 구조 모두에 진심을 담고, <strong>사용자와의 연결</strong>을 우선합니다.</p>
          <p>사용자에게 자연스럽게 닿는 컨텐츠 경험을 만드는 웹디자이너가 되겠습니다.</p>

          
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


    <!-- 스킬 섹션 -->
    <v-container  class="sec3" fluid>
      <v-row dense justify="center" class="skill-grid">
        <v-col cols="12" class="sec3_title title">Skill .</v-col>
      
        <v-col
          v-for="(skill, index) in skills"
          :key="index"
          cols="6"
          sm="4"
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


    <!-- 프로젝트 섹션 -->
    <v-container class="sec4" fluid id="project">
      <v-row dense justify="center">
        <v-col cols="12" class="sec4_title title">Project .</v-col>

        <!-- 페이지당 프로젝트 3개씩 출력 -->
        <v-col
          v-for="(project, index) in paginatedProjects"
        :key="project.title"
        cols="12"
        sm="6"
        md="3"
        class="mx-3 my-3"
        >
          <v-card class="project-card mx-auto" max-width="500" @click="selected = project">
            <v-img :src="project.thumbnail" height="320" cover />

            <v-card-title class="project_card_title">{{ project.title }}</v-card-title>

            <v-card-text class="project_card_text my-2">{{ project.desc }}</v-card-text>

            <!-- ✅ 카드 안에 툴 칩 표시 -->
            <v-card-subtitle class="px-4 pb-0">
              <v-chip
                v-for="(item, i) in project.tool"
                :key="`card-${i}`"
                class="mb-5 mr-2"
                :color="toolColors[item] || 'grey'"
                :text-color="(toolColors[item] || 'grey') + '-darken-3'"
                size="small"
                label
                variant="outlined"
                rounded="pill"
              >
                {{ item }}
              </v-chip>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- ✅ 페이지네이션 컨트롤 -->
      <v-row justify="center" class="mt-4">
        <v-col cols="auto">
          <v-pagination
            v-model="currentPage"
            :length="Math.ceil(projects.length / itemsPerPage)"
            :total-visible="5"
            rounded="circle"
            color="blue"
          />
        </v-col>
      </v-row>

      <!-- ✅ 상세보기 다이얼로그 -->
      <v-dialog v-model="selected" max-width="600">
        <v-card v-if="selected">
          <v-card-title class="mt-3">{{ selected.title }}</v-card-title>

          <!-- 🔻 동영상/이미지/PDF 분기 렌더링 -->
          <div class="px-3 pt-2" v-if="selected.preview">
            <!-- PDF 파일 -->
            <iframe
              v-if="selected.preview.endsWith('.pdf')"
              :src="selected.preview"
              width="100%"
              height="500"
              style="border-radius: 10px; border: none;"
            ></iframe>

            <!-- mp4 비디오 -->
            <video
              v-else-if="selected.preview.endsWith('.mp4')"
              :src="selected.preview"
              controls
              playsinline
              preload="metadata"
              style="width: 100%; 
              max-height: 450px;
              border-radius: 10px"
            ></video>

            <!-- 이미지 -->
            <v-img
              v-else
              :src="selected.preview"
              height="450"
              cover
              class="rounded"
            />
          </div>


          <v-card-text class="px-8 mt-5">{{ selected.detail }}</v-card-text>

          <!-- 팝업 내부 칩 출력
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
          </v-card-text> -->

          <v-card-text class="pa-4 text-center">
            <v-btn
              v-if="selected.link"
              :href="selected.link"
              target="_blank"
              color="blue"
              variant="tonal"
              class="mt-2"
            >
              Go Site
            </v-btn>
          </v-card-text>

          <v-card-actions>
            <v-btn text color="primary" @click="selected = null">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>


    <!-- 컨텍 섹션 -->
    <v-container id="contact" class="sec5" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" class="sec5_title title">Contact .</v-col>

        <v-col cols="12" class="contact_box d-flex align-center justify-center">
          <p class="contact contact_text mb-4">
            항상 더 나은 방향을 고민하며, 움직이겠습니다.
          </p>
        </v-col>

        <!-- ✅ 아이콘 버튼 섹션 -->
          <v-col cols="12" class="d-flex align-center ga-15 icon justify-center">
            <!-- ✅ 이메일 아이콘 -->
            <v-btn
              icon
              :href="'mailto:chyva121@naver.com'"
              variant="text"
              size="large"
              color="blue"
            >
              <v-icon size="40"
              style="
              border-radius: 50%; 
              box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2); 
              padding: 30px;">
              mdi-email</v-icon>
            </v-btn>

            <!-- ✅ 전화 아이콘 -->
            <v-btn
              icon
              :href="'tel:01042249988'"
              variant="text"
              size="large"
              color="green"
            >
              <v-icon size="40"
              style="
              border-radius: 50%; 
              box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2); 
              padding: 30px;">>
              mdi-phone</v-icon>
            </v-btn>
          </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// 스킬 상세 내용
import htmlImg from '../assets/img/html.png'
import css3Img from '../assets/img/css.png'
import bootstrapImg from '../assets/img/bt.png'
import vuetifyImg from '../assets/img/vf.png'
import figmaImg from '../assets/img/figma.png'
import photoshopImg from '../assets/img/ps.png'
import illustratorImg from '../assets/img/ai.png'
import aeImg from '../assets/img/ae.png'

// 툴별 색상
const toolColors = {
  HTML: 'orange',
  CSS3: 'blue',
  Bootstrap: 'purple',
  Vuetify3: 'teal',
  Figma: 'pink',
  Photoshop: 'indigo',
  Illustrator: 'deep-orange',
  'After Effects': 'blue',
}

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

// 페이지네이션 관련 변수 추가
const itemsPerPage = 3
const currentPage = ref(1)

// 현재 페이지에 표시할 프로젝트 계산
const paginatedProjects = computed(() => { // 깜빡임 줄이기 위해 computed 사용 유지
  const start = (currentPage.value - 1) * itemsPerPage
  return projects.slice(start, start + itemsPerPage)
})

const projects = [
  {
    title: '카드뉴스 디자인',
    tool: ['Illustrator'],
    thumbnail: 'img/cardnews1.png',
    preview: 'img/cardnews.pdf',
    desc: '청년 우울증 인식을 위한 SNS용 카드뉴스 디자인',
    detail: '청년층의 우울증 증가 원인을 간단히 짚고, 현실적인 도움 정보를 전달하는 5컷 구성의 SNS용 카드뉴스입니다. 공익적 목적에 맞춰 직관적인 구성과 전달력을 고려해 디자인 했습니다.',
  },
  {
    title: '모바일 앱 디자인',
    tool: ['Photoshop'],
    thumbnail: 'img/mobile_app1.png',
    preview: 'img/mobile_app2.png',
    desc: '합리적&계획적 소비를 위한 실용적 위시리스트 앱 디자인',
    detail: '카테고리, 우선순위 분류와 시각적 리스트 구성으로 항목을 효율적으로 관리하며, 예산 체크와 다양한 알림 기능으로 계획적인 소비를 유도하는 UI/UX를 설계했습니다.',
  },
  {
    title: '브랜드 홍보 영상',
    tool: ['After Effects','Illustrator'],
    thumbnail: 'img/subway_pc.png',
    preview: 'video/subway_video.mp4',
    link: 'https://yeon-11.github.io/subway-advertising/',
    desc: '신선함의 가치를 담은 서브웨이 브랜드 홍보 영상',
    detail: '“산지 그대로의 싱그러움, 매일을 신선하게”라는 메시지를 중심으로, 농장에서 시작된 재료가 소비자의 샌드위치로 완성되는 과정을 일러스트와 모션 그래픽으로 표현한 브랜드 홍보 영상입니다.',
  },
  {
    title: '안테나뮤직 웹사이트 리디자인',
    tool: ['HTML', 'Bootstrap'],
    thumbnail: 'img/antenna_pc.png',
    link: 'https://leejinhee1106.github.io/antenna_html/',
    desc: 'HTML, 시맨틱 마크업 기반해 구조를 재설계한 반응형 리디자인',
    detail: '기존 사이트의 디자인과 사용자 흐름에서 아쉬웠던 점을 분석하고, 정보 구조와 시각적 개성을 새롭게 구성 하였습니다. 다양한 디바이스에서도 일관된 사용자 경험을 제공할 수 있도록 반응형 레이아웃을 적용하여 리디자인 했습니다.',
  },
  {
    title: '미드림성형외과 웹사이트 리디자인',
    tool: ['Vuetify3','Bootstrap','Figma'],
    thumbnail: 'img/meedream_pc.png',
    link: 'https://hanya-121.github.io/vueport/',
    desc: '사용자 흐름과 콘텐츠 전달력을 강화한 반응형 웹 리디자인',
    detail: '디자인을 현대적으로 개선하고, 긴 설명은 키워드 중심으로 재구성해 가독성을 높였습니다. 사용자 시선과 흐름을 고려해 콘텐츠를 배치하고, 성형외과 특성에 맞춰 브랜드 이미지를 강화했습니다.',
  },
  {
    title: '2025 식품안전나라 20초 영상 공모전',
    tool: ['After Effects','Illustrator','Figma'],
    thumbnail: 'img/food_pc.png',
    preview: 'video/food.mp4',
    desc: '식품안전의 중요성을 유쾌하게 전달한 모션그래픽 영상',
    detail: '식품안전 수호자 ‘미어로’와 캐릭터화된 식재료들이 등장하는 20초 스토리형 애니메이션입니다. 귀여운 톤과 경쾌한 연출을 통해 ‘식품안전나라’의 공신력과 접근성을 자연스럽게 전달했습니다.',
  },
  {
    title: '키네틱 타이포그래피',
    tool: ['After Effects','Illustrator'],
    thumbnail: 'img/kinetic_pc.png',
    preview: 'video/ATTITUDE.mp4',
    desc: '아이브(IVE)의 곡을 활용한 리듬감 있는 키네틱 타이포그래피',
    detail: 'IVE의 ‘Attitude’ 1절 구간을 기반으로 제작한 키네틱 타이포그래피 영상입니다. 박자와 가사에 맞춘 텍스트 애니메이션을 통해 곡의 에너지와 메시지를 시각적으로 표현했습니다.',
  },
]

</script>

<style>
@import '@/styles/_Main.scss';
</style>