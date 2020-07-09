<template>
  <div>
    <el-dialog
      title="上传画面"
      :visible.sync="isShow"
      class="content-dialog-box upload-dialog"
      :close-on-click-modal="false"
      custom-class="dialog-drag"
      top="0"
      :before-close="handleClose"
    >
    <el-upload
        class="upload-demo"
        drag
        ref="upload"
        :http-request="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :auto-upload="false"
        :on-success="handleSuccess"
        multiple>
        <i class="iconfont iconshangchuan1"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="upload-btn" @click="submitUpload"><span class="operation-text"><i class="iconfont iconshangchuan" /></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上&nbsp;传</div>
      <div class="upload-bg-box">
          <div class="detail-header">处理详情</div>
            <div class="detail-time">
                <div class="detail-time-left">{{uploadInfo.startDate}} 上传开始</div>
                    <div class="detail-time-line"></div>
                <div class="detail-time-right">{{uploadInfo.endDate}} 上传结束</div>
            </div>
            <div class="detail-info">
              <ul class="filelist">
                  <div class="scroll-info-list">
                    <li class="info-err">
                      交际费1：数字类型不正确，请输入数字。（当前值：a）
                    </li>
                    <li class="info-err">
                        交际费2：数字类型不正确，请输入数字。（当前值：b）
                    </li>
                    <li class="info-err">
                        交际费3：数字类型不正确，请输入数字。（当前值：b）
                    </li>
                    <li class="info-err">
                        交际费4：数字类型不正确，请输入数字。（当前值：b）
                    </li>
                    <li class="info-err">
                        交际费5：数字类型不正确，请输入数字。（当前值：b）
                    </li>
                  </div>
                    <li>
                      修改后，请重新上传
                  </li>
              </ul>
            </div>              
      </div>
    </el-dialog>
    </div>
</template>
<script>
import $ from 'jquery'
import 'jquery.nicescroll'
export default {
  data() {
    return {
      fileList: [{
        name: '2020开发部.xlsx',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: '2020开发部.xlsx',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: '2020开发部.xlsx',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      uploadInfo:
      {
        startDate: "2020-03-23 19：15：33",
        endDate: "2020-03-23 19：15：33"
      },
      scrollColr: localStorage.getItem('theme') !== 'Dark' ? '#D8E0E8' : '#5A5E63'

    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.draggable()
    this.$nextTick(function(){
      this.getScrollBar()
    })
  },
  methods: {
    handleClose(done) {
      this.$emit('onClose')
    },
    upload() {
      console.log('上传')
    },
    submitUpload() {
      this.$nextTick(() => {
        this.$refs.upload.submit()
        this.uploadInfo.startDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ": " + new Date().getMinutes() + ": " + new Date().getSeconds();
        console.log(1)
      })
    },
    handleSuccess() {
      this.uploadInfo.endDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ": " + new Date().getMinutes() + ": " + new Date().getSeconds();
    },
    getScrollBar() {
      $('.scroll-info-list').niceScroll({
        cursorcolor: this.scrollColr,
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: '8px', // 滚动条的宽度，单位：便素
        cursorborder: `1px solid ${this.scrollColr}`, // CSS方式定义滚动条边框
        autohidemode: true, // 隐藏滚动条的方式, 可用的值:
        zindex: 0,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        boxzoom: false,
        iframeautoresize: false // 在加载事件时自动重置iframe大小
      })
    },
    draggable() {
      $('.dialog-drag').draggable({
        cursor: 'move',
        handle: '.el-dialog__header',
        refreshPositions: true,
        containment: 'parent',
        stop() {
          $('.el-table__body-wrapper').getNiceScroll().resize();
          $('.el-dialog__body').getNiceScroll().resize();
          $('.scroll-info-list').getNiceScroll().resize();
        }
      })
    },

  }
}
</script>
<style lang="scss">
.upload-dialog .dialog-drag {
  width: 800px;
  min-width: 800px;
  height: 620px;
  max-height: 800px;
  .el-icon-close {
    font-size: 22px;
    color: #ffffff;
    font-weight: bold;
  }

  .el-dialog__body {
    // padding: 30px 20px 20px 20px;
    overflow: hidden;
    .el-upload {
      border: 1px solid #cccccc;
      width: 100%;
      height: 204px;
      .el-upload-dragger {
        border: none;
        width: 100%;
        height: 100%;
      }
      .iconshangchuan1 {
        font-size: 140px;
        color: #dddddd;
      }
    }
    .el-upload-list {
      float: left;
      width: calc(100% - 130px);
      margin-top: 10px;
      margin-bottom: 20px;
      .el-upload-list__item {
        width: auto;
      }
      .el-icon-close {
        color: #666666;
      }
    }
    // .el-upload-list {
    //   display: none;
    // }
    .upload-btn {
      width: 130px;
      height: 48px;
      margin-top: 10px;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 4px 1px rgba(28, 29, 84, 0.15);
      border-radius: 24px;
      padding: 5px;
      line-height: 38px;
      float: right;
      cursor: pointer;
      .operation-text {
        display: inline-block;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        padding: 0;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(71, 91, 160, 1) 0%,
          rgba(47, 165, 187, 1) 100%
        );
      }
    }

    .upload-bg-box {
      width: 100%;
      height: 248px;
      border: 1px solid #cccccc;
      margin-top: 75px;
      box-sizing: border-box;
      border-radius: 16px;
      padding: 20px;
      //   overflow: scroll;
      .detail-header {
        width: 100%;
        height: 20px;
        color: #333333;
        font-size: 14px;
        line-height: 20px;
        font-display: "微软雅黑";
      }
      .detail-time {
        padding: 10px 0;
        height: 58px;
        position: relative;
        .detail-time-left {
          width: 316px;
          height: 38px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border: 1px solid rgba(204, 204, 204, 1);
          text-align: center;
          line-height: 38px;
          font-size: 14px;
          font-display: "微软雅黑";
          float: left;
        }

        .detail-time-right {
          width: 316px;
          height: 38px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          border: 1px solid rgba(204, 204, 204, 1);
          text-align: center;
          line-height: 38px;
          font-size: 14px;
          font-display: "微软雅黑";
          float: right;
        }
        .detail-time-right::before {
          content: "";
          position: absolute;
          width: 60px;
          height: 19px;
          border-bottom: 1px solid #979797;
          left: 46%;
        }
      }
      .detail-info {
        width: 100%;
        height: auto;
        li {
          height: 20px;
          line-height: 20px;
          color: #666666;
          font-family: "微软雅黑";
          margin-bottom: 5px;
        }
        .info-err {
          color: #ed5565;
        }
      }
    }
  }
  .scroll-info-list{
    max-height: 125px;
    overflow: auto;
  }
}
</style>
