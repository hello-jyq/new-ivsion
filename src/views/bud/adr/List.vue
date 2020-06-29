<template>
  <div :class="theme=='Light'?'apply advice-page apply-light':'apply advice-page'">
    <div class="search-left-box tree-org-user">
      <div class="tree-box-wrap">
        <!-- <div> -->
          <el-tree
            ref="tree"
            :data="data"
            node-key="id"
            :highlight-current="false"
            :default-expanded-keys="expandedKeys"
            :expand-on-click-node="true"
            @node-click="selectNode"
          >
            <template slot-scope="scope">
              <div class="custom-tree-node">
                <div class="tree_item">
                  {{ scope.data.name }}
                </div>
              </div>
            </template>
          </el-tree>
        <!-- </div> -->
      </div>
    </div>
    <div class="advice-content advice-index-content content">
      <ul class="advice-title-box">
        <li class="advice-title-items">
          <span class="advice-items-text">年度</span>
          <span class="advice-items-content">2020</span>
        </li>
        <li>
          <div class="advice-title-items" style="display: grid;">
            <span class="operation-text" style="font-weight: bold;">所在组织位置<i class="iconfont iconshuangjiantouyou" />
              <template>
                <div style="font-weight: normal;">iVision >BS統括</div>

              </template>
            </span>
          </div>
        </li>
      </ul>
      <div class="advice-top-box">
        <div class="advice-container-box">
          <div class="swiper-container swiper-big-box">
            <div class="swiper-wrapper">
              <div v-for="(item,index) in dataList" :key="index" class="swiper-slide">
                <div class="slide-round-box">
                  <div class="slide-text-box" @click="activeindex == index ? onDetail('0',item.name):null">
                    <i :class="item.icon" />
                    <p>{{ item.name }}</p>
                  </div>

                  <div class="slide-items-div slide-items-top-left">
                    <div class="slide-items-div-content" @click="activeindex == index ? onAdopt('2',item.name):null">
                      <span class="slide-items-icon">
                        <i class="iconfont iconyusuanbaobiao" />
                      </span>
                      <div class="slide-items-content">
                        <p class="slide-items-name">
                          预算：
                        </p>
                        <p>{{ item.budget }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="slide-items-div slide-items-top-right">
                    <div class="slide-items-div-content" @click="activeindex == index ? onAdopt('4',item.name):null">
                      <span class="slide-items-icon">
                        <i class="iconfont icondaiban1" />
                      </span>
                      <div class="slide-items-content">
                        <p class="slide-items-name">
                          禀议通过：
                        </p>
                        <p>{{ item.adopt }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="slide-items-div slide-items-bottom-left">
                    <div class="slide-items-div-content" @click="activeindex == index ? onAdopt('1',item.name):null">
                      <span class="slide-items-icon">
                        <i class="iconfont iconjine" />
                      </span>
                      <div class="slide-items-content">
                        <p class="slide-items-name">
                          实绩：
                        </p>
                        <p>{{ item.actual }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="slide-items-div slide-items-bottom-right">
                    <div class="slide-items-div-content" @click="activeindex == index ? onAdopt('3',item.name):null">
                      <span class="slide-items-icon">
                        <i class="iconfont icondaiban1" />
                      </span>
                      <div class="slide-items-content">
                        <p class="slide-items-name">
                          禀议中：
                        </p>
                        <p>{{ item.discussion }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev big-prev" />
        <div class="swiper-button-next big-next" />
      </div>
      <div ref="adviceBox" class="advice-bottom-box">
        <div class="advice-thumbs-box swiper-container">
          <div class="swiper-wrapper">
            <div v-for="(item,index) in dataList" :key="index" class="swiper-slide">
              <div class="slide-thumbs">
                <p> {{ item.name }}</p>
                <i :class="item.icon" />
              </div>
            </div>
          </div>
          <div class="swiper-pagination thumbs-page" />
        </div>

        <div class="swiper-button-prev thumbs-prev" />
        <div class="swiper-button-next thumbs-next" />
      </div>
    </div>
  </div>
</template>
<script>
import { getAllOrgTree } from '@/api/admin/org-api.js'
import { getAdrList } from '@/api/bud/adr/adr-api.js'
import Swiper from 'swiper/dist/js/swiper.js'
import $ from 'jquery'
import 'jquery.nicescroll'
var elementResizeDetectorMaker = require('element-resize-detector')

export default {
  name: 'Carrousel',
  data() {
    return {
      theme: localStorage.getItem('theme') !== 'Dark' ? 'Light' : '',
      activeindex: 0,
      data: [],
      listTabs: [],
      activeTabs: '',
      activeOperation: '',
      visible: false,
      activeName: null,
      expandedKeys: [],
      dataList: [

      ]
    }
  },
  watch: {

    $route(to, from) {
      // console.log(to)
      this.activeName = to.query.name
    }
  },
  mounted() {
    this.searchTree()
    this.AdrList()
  },
  methods: {
    getScrollTree() {
      $('.tree-box-wrap').niceScroll({
        cursorcolor: localStorage.getItem('theme') != 'Dark' ? '#D8E0E8' : '#5A5E63',
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${localStorage.getItem('theme') != 'Dark' ? '#D8E0E8' : '#5A5E63'}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 99,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: true // 在加载事件时自动重置iframe大小
      })
    },
    async searchTree() {
      const res = await getAllOrgTree()
      if (res && res.success) {
        this.data = res.datas.orgs
        // 默认展开
        if (this.data) {
          // this.expandedKeys = this.data.map(item => item.id)
          this.data.map(items => {
            console.log('items', items)

            this.expandedKeys.push(items.id)
            this.activeName = items.name
          })
          this.$nextTick(function(){
            let _this=this;
            setTimeout(function(){
              _this.getScrollTree();
              $('.tree-box-wrap').getNiceScroll().resize()
            },500)
          })
        }
      }
    },
    async AdrList() {
      const res = await getAdrList()
      if (res && res.success) {
        this.dataList = res.datas.searchResult
        this.$nextTick(() => { // 下一个UI帧再初始化swiper
          this.initSwiper()
        });

        // 默认展开
      }
    },
    initSwiper() {
      // const self = this
      var gallerThumb = new Swiper('.advice-thumbs-box', {
        loop: true,
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        runCallbacksOnInit: false,
        pagination: {
          el: '.thumbs-page',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.thumbs-next',
          prevEl: '.thumbs-prev'
        },
        on: {
          click: function () {
            gallerTop.slideToLoop(this.realIndex, 500, false)
          },
          slideChangeTransitionEnd: function () {
            self.activeindex = this.realIndex
            console.log('activeindex', this.activeindex)
            gallerTop.slideToLoop(this.realIndex, 500, false)
          }
        }
      })

      var gallerTop = new Swiper('.swiper-big-box', {
        loop: true,
        initialSlide: 0,
        slidesPerView: '3',
        centeredSlides: true,
        slideToClickedSlide: true,
        runCallbacksOnInit: false,
        navigation: {
          nextEl: '.big-next',
          prevEl: '.big-prev'
        },
        on: {
          slideChangeTransitionEnd: function () {
            self.activeindex = this.realIndex
            gallerThumb.slideToLoop(this.realIndex, 500, false)
          }
        }
      })
      // 菜单栏收缩时更新轮播
      var erd = elementResizeDetectorMaker()
      erd.listenTo(self.$refs.adviceBox, function (element) {
        self.$nextTick(function () {
          gallerThumb.update()
        })
      })

    },
    // 点击节点
    selectNode(target) {
      console.log('target', target)
      this.activeName = target.name
      let _this=this;
      setTimeout(function(){
        _this.getScrollTree();
        $('.tree-box-wrap').getNiceScroll().resize()
      },500)
    },
    // 禀议详情
    onDetail(id, name) {
      this.$router.push({
        path: '/adr/edit',
        query: {
          id: id,
          name: name
        }
      })
    },
    // 预算
    onBudget(id, name) {
      this.$router.push({
        path: '/adr/budget',
        query: {
          id: id,
          name: name
        }
      })
    },
    // 禀议中
    onRunning(id, name) {
      this.$router.push({
        path: '/adr/running',
        query: {
          id: id,
          name: name
        }
      })
    },
    // 禀议通过
    onAdopt(id, name) {
      this.$router.push({
        path: '/adr/adopt',
        query: {
          id: id,
          name: name
        }
      })
    },
    // 实绩
    onActual(id, name) {
      this.$router.push({
        path: '/adr/actual',
        query: {
          id: id,
          name: name
        }
      })
    },
    // getDragBar() {
    //   $('.el-tree-node').niceScroll({
    //     cursorcolor: this.scrollColr,
    //     cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
    //     cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
    //     cursorwidth: '8px', // 滚动条的宽度，单位：便素
    //     cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
    //     autohidemode: true, // 隐藏滚动条的方式, 可用的值:
    //     zindex: 0,
    //     railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
    //     boxzoom: false,
    //     iframeautoresize: true // 在加载事件时自动重置iframe大小
    //   })
    // }
  }
}
</script>
<style scoped lang="scss">
.advice-page {
  .search-left-box {
    margin-right: 0 !important;
  }
}
.swiper-button-prev:focus,
.swiper-button-next:focus {
  outline: none;
}
.advice-content {
  width: calc(100% - 310px);
  overflow: hidden;
}
.advice-title-box {
  .operation-text {
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  .iconshuangjiantouyou {
    margin-top: 4px;
    font-size: 16px;
  }
  p {
    display: none;
    color: #666666 !important;
    animation: hideIndex 0.3s;
  }

  @keyframes hideIndex {
    0% {
      opacity: 0;
      transform: translate(-20px, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  .operation-text:hover {
    p {
      display: block;
    }
  }
}
#app[data-theme="Dark"] {
  .advice-title-box p {
    color: #cccccc !important;
  }
}
.home aside.collapse + .header + .main .advice-container-box {
  width: 1352px;
}
.home
  aside.collapse
  + .header
  + .main
  .advice-top-box
  .swiper-big-box
  .swiper-slide-active {
  margin: 0 119px;
}
.home aside.collapse + .header + .main .advice-top-box .swiper-button-prev {
  left: 25px;
}
.home aside.collapse + .header + .main .advice-top-box .swiper-button-next {
  right: 25px;
}
.home aside.collapse + .header + .main .advice-bottom-box {
  padding: 0 58px;
}
.home aside.collapse + .header + .main .advice-bottom-box .swiper-button-prev {
  left: 20px;
}
.home aside.collapse + .header + .main .advice-bottom-box .swiper-button-next {
  right: 20px;
}

.advice-container-box {
  width: 1172px;
  margin: 0 auto;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.advice-top-box {
  position: relative;
  display: flex;
  flex: auto;
  align-items: center;
  background-image: url("../../../assets/images/advice/advicebg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .swiper-button-prev,
  .swiper-button-next {
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    margin-top: 0;
    background-image: url("../../../assets/images/iconbg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: translate(0, -50%);
  }

  .swiper-button-prev {
    left: 5px;
  }
  .swiper-button-next {
    right: 5px;
  }
  .swiper-button-next::before,
  .swiper-button-prev::before {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 13px;
    color: #ffffff;
  }
  .swiper-button-next::before {
    content: "\e62e";
  }
  .swiper-button-prev::before {
    content: "\e6bc";
  }
  .swiper-big-box {
    .swiper-slide {
      text-align: center;
      height: 416px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .swiper-slide-active {
      width: 773px !important;
      margin: 0 29px;
    }
    .swiper-slide-prev,
    .swiper-slide-next {
      width: 170px !important;
    }
  }
}

.slide-round-box {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 170px;
  height: 170px;
  background-image: url("../../../assets/images/advice/bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  .slide-items-div {
    position: absolute;
    display: flex;
    align-items: center;
    opacity: 0;
    width: 190px;
    height: 80px;
    z-index: 900;
    background-image: url("../../../assets/images/advice/items.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .slide-items-icon {
      width: 88px;
      text-align: center;
      i {
        font-size: 16px;
        color: #00e2de;
      }
    }
    .slide-items-content {
      font-family: "微软雅黑";
      font-weight: bold;
      font-size: 18px;
      color: #00e2de;
      text-align: left;
      .slide-items-name {
        margin-bottom: 8px;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
  .slide-items-div-content {
    position: absolute;
    width: 190px;
    height: 80px;

    z-index: 999;
    display: contents;
  }
  .slide-items-div-content::after {
    position: absolute;
    content: "";
    width: 190px;
    height: 80px;
    z-index: 999;
    display: block;
    cursor: pointer;
  }
  .slide-items-top-left {
    left: 200px;
    top: 200px;
    z-index: -1;
  }
  .slide-items-top-right {
    right: 200px;
    top: 200px;
    z-index: -1;
  }
  .slide-items-bottom-left {
    left: 200px;
    bottom: 200px;
    z-index: -1;
  }
  .slide-items-bottom-right {
    right: 200px;
    bottom: 200px;
    z-index: -1;
  }
}
.swiper-slide-active .slide-text-box {
  cursor: pointer;
}
.slide-text-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 100px;
  height: 100px;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
  i {
    margin-bottom: 6px;
    font-size: 22px;
    color: #00e2de;
  }
  p {
    width: 100%;
    line-height: 16px;
    font-size: 12px;
    color: #00e2de;
  }
}
.swiper-slide-active .slide-round-box {
  width: 483px;
  height: 416px;
  background-image: url("../../../assets/images/advice/activebg.png");
  .slide-text-box {
    padding: 0;
    i {
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      font-size: 30px;
      color: #ffffff;
    }
    p {
      line-height: 22px;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .slide-items-top-left {
    opacity: 1;
    left: -145px;
    top: 0;
    z-index: 9;
    transition: all 1s;
  }
  .slide-items-top-right {
    opacity: 1;
    top: 0;
    right: -145px;
    z-index: 9;
    transition: all 1s;
  }
  .slide-items-bottom-left {
    opacity: 1;
    left: -145px;
    bottom: 0;
    z-index: 9;
    transition: all 1s;
  }
  .slide-items-bottom-right {
    opacity: 1;
    bottom: 0;
    right: -145px;
    z-index: 9;
    transition: all 1s;
  }
}

.advice-bottom-box {
  position: relative;
  height: 195px;
  padding: 0 70px 0 70px;
  margin-bottom: 11px;
  margin-top: -30px;
  .swiper-slide {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 160px;
    height: 180px;
    padding-top: 28px;
    background-image: url("../../../assets/images/advice/thumbsbg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: -38px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    margin-top: -32px;
    line-height: 44px;
    width: 15px;
    background-image: none;
  }
  .swiper-button-prev {
    left: 25px;
  }
  .swiper-button-next {
    text-align: right;
    right: 25px;
  }
  .swiper-button-next::before,
  .swiper-button-prev::before {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 14px;
    color: #00e2de;
  }
  .swiper-button-next::before {
    content: "\e62e";
  }
  .swiper-button-prev::before {
    content: "\e6bc";
  }
}

.slide-thumbs {
  position: relative;
  width: 98px;
  height: 120px;
  padding: 15px 10px 0;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #ffffff;
  border-radius: 16px;
  cursor: pointer;
  // border:1px solid #555555;
  overflow: hidden;
  i {
    position: absolute;
    right: -10px;
    bottom: 0;
    width: 60px;
    height: 60px;
    font-size: 60px;
    color: rgba(255, 255, 255, 0.1);
  }
  .iconzhihuitongxin {
    right: -2px;
    bottom: 4px;
    font-size: 65px;
  }
  .iconzichan {
    right: 2px;
    bottom: 0;
    font-size: 65px;
  }
  .iconboshimao {
    right: 9px;
    bottom: 3px;
    font-size: 73px;
  }
  .iconjiaotongchuhang {
    right: 6px;
    bottom: -1px;
    font-size: 66px;
  }
  .iconhuiyishi {
    right: 0px;
    bottom: 0px;
    font-size: 70px;
  }
  .iconhangzhengxuke {
    right: -11px;
    bottom: -2px;
  }
  .iconbaoxian {
    right: -3px;
    bottom: 2px;
  }
  .iconchuchahaiwaiqianzhengshenqingliucheng {
    right: -1px;
    bottom: 2px;
  }
  .icondrxx106 {
    right: 0px;
    bottom: 4px;
  }
  .iconxinwen {
    right: -1px;
  }
}
.advice-thumbs-box .swiper-slide-active {
  background-image: url("../../../assets/images/advice/thumbsActivebg.png");
}

.swiper-pagination-fraction {
  top: 170px;
  bottom: auto;
  font-size: 12px;
  color: #ffffff;
}
.apply-light {
  .search-left-box {
    background: #fafcff;
    box-shadow: 8px 2px 10px 0px rgba(24, 63, 170, 0.1);
    .el-tree-node__expand-icon {
      background-image: url("../../../assets/images/arrow-light.png");
    }
  }
  .slide-items-div-content {
    left: 17px;
  }
  .slide-items-div-content::after {
    left: 17px;
  }
  .advice-items-text {
    color: #666666;
  }
  .advice-items-content {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(28, 29, 84, 0.15);
    border: none;
    border-radius: 19px;
    color: #333333;
    line-height: 38px;
  }
  .advice-top-box {
    .advice-container-box {
      margin: 17px auto 0 auto;
    }
    background-image: url("../../../assets/images/advice/advicebg-light.png");
    .swiper-slide-active {
      height: 450px;
      .slide-round-box {
        background-image: url("../../../assets/images/advice/activebg-light.png");
        .slide-text-box {
          i {
            font-size: 36px;
            color: #2fa5bb;
          }
          p {
            color: #2fa5bb;
          }
        }
      }
      .slide-items-top-left {
        opacity: 1;
        left: -162px;
        top: -17px;
        transition: all 1s;
      }
      .slide-items-top-right {
        opacity: 1;
        right: -162px;
        top: -17px;
        transition: all 1s;
      }
      .slide-items-bottom-left {
        opacity: 1;
        left: -162px;
        bottom: -17px;
        transition: all 1s;
      }
      .slide-items-bottom-right {
        opacity: 1;
        right: -162px;
        bottom: -17px;
        transition: all 1s;
      }
    }
    .slide-round-box {
      background-image: url("../../../assets/images/advice/bg-light.png");
      .slide-items-div {
        width: 224px;
        height: 114px;
        background-image: url("../../../assets/images/advice/items-light-shadow.png");
        .slide-items-icon {
          width: 105px;
          padding-left: 14px;
          i {
            color: #ffffff;
            font-size: 18px;
          }
        }
        p {
          color: #ffffff;
          font-weight: bold;
        }
        .slide-items-name {
          font-weight: normal;
        }
      }
      .slide-text-box {
        i,
        p {
          color: #2fa5bb;
        }
      }
    }
    .big-prev {
      width: 34px;
      height: 34px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(28, 29, 84, 0.15);
      border-radius: 17px;
      line-height: 34px;
      margin-left: 20px;
      margin-top: -5px;
    }
    .big-prev::before {
      color: #2fa5bb;
      font-size: 18px;
    }
    .big-next {
      width: 34px;
      height: 34px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(28, 29, 84, 0.15);
      border-radius: 17px;
      line-height: 34px;
      margin-right: 20px;
      margin-top: -5px;
    }
    .big-next::before {
      color: #2fa5bb;
      font-size: 18px;
    }
  }
  .tree-help-popper {
    width: 190px;
    height: 130px;
    padding: 10px 15px;
    background: linear-gradient(
      180deg,
      rgba(71, 91, 160, 1) 0%,
      rgba(47, 165, 187, 1) 100%
    ) !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 16px;
  }
  .tree-help-items {
    line-height: 26px;
    font-size: 12px;
    color: #ffffff;
  }
  .advice-bottom-box {
    .swiper-slide {
      width: 132px;
      height: 152px;
      padding-top: 15px;
      margin-top: 15px;
      background-image: url("../../../assets/images/advice/thumbsbg-light.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      margin-right: -8px;
      .slide-thumbs {
        height: 117px;
        color: #2fa5bb;
      }
      i {
        color: #2fa5bb;
        opacity: 0.3;
      }
    }
    .swiper-slide-active {
      background-image: url("../../../assets/images/advice/thumbsActivebg-light.png");
      .slide-thumbs {
        color: #ffffff;
      }
      i {
        color: #ffffff;
        opacity: 0.3;
      }
    }
  }
  .swiper-pagination-fraction {
    color: #2fa5bb;
  }
}

@media (max-width: 1919px) {
  .swiper-slide-active {
    .slide-items-top-left {
      opacity: 1;
      left: -103px !important;
      top: 0 !important;
      transition: all 1s;
    }
    .slide-items-top-right {
      opacity: 1;
      top: 0 !important;
      right: -103px !important;
      transition: all 1s;
    }
    .slide-items-bottom-left {
      opacity: 1;
      left: -103px !important;
      bottom: 0 !important;
      transition: all 1s;
    }
    .slide-items-bottom-right {
      opacity: 1;
      bottom: 0 !important;
      right: -103px !important;
      transition: all 1s;
    }
  }
  .apply-light {
    .swiper-slide-active {
      .slide-items-top-left {
        opacity: 1;
        left: -103px !important;
        top: -12px !important;
        transition: all 1s;
      }
      .slide-items-top-right {
        opacity: 1;
        top: -12px !important;
        right: -103px !important;
        transition: all 1s;
      }
      .slide-items-bottom-left {
        opacity: 1;
        left: -103px !important;
        bottom: -12px !important;
        transition: all 1s;
      }
      .slide-items-bottom-right {
        opacity: 1;
        bottom: -12px !important;
        right: -103px !important;
        transition: all 1s;
      }
    }
  }
}
</style>
