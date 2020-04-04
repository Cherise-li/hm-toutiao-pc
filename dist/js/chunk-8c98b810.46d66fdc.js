(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c98b810"],{"1efa":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content-container"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("my-bread",[t._v("内容管理")])],1),r("el-form",{attrs:{"label-width":"80px",size:"small"}},[r("el-form-item",{attrs:{label:"状态:"}},[r("el-radio-group",{model:{value:t.reqParams.status,callback:function(e){t.$set(t.reqParams,"status",e)},expression:"reqParams.status"}},[r("el-radio",{attrs:{label:null}},[t._v("全部")]),r("el-radio",{attrs:{label:0}},[t._v("草稿")]),r("el-radio",{attrs:{label:1}},[t._v("待审核")]),r("el-radio",{attrs:{label:2}},[t._v("审核通过")]),r("el-radio",{attrs:{label:3}},[t._v("审核失败")]),r("el-radio",{attrs:{label:4}},[t._v("已删除")])],1)],1),r("el-form-item",{attrs:{label:"频道:"}},[r("my-channel",{attrs:{value:t.reqParams.channel_id},on:{input:function(e){t.reqParams.channel_id=e}}})],1),r("el-form-item",{attrs:{label:"日期:"}},[r("div",{staticClass:"block"},[r("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.changeDate},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)]),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.filter}},[t._v("筛选")])],1)],1)],1),r("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"20px"}},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[t._v("根据筛选条件共查询到"+t._s(t.count)+"条结果")])]),r("el-table",{attrs:{data:t.articles}},[r("el-table-column",{attrs:{label:"封面"},scopedSlots:t._u([{key:"default",fn:function(t){return[r("el-image",{staticStyle:{width:"150px",height:"120px"},attrs:{fit:"cover",src:t.row.cover.images[0]}},[r("div",{staticClass:"image-slot",attrs:{slot:"error"},slot:"error"},[r("img",{staticStyle:{width:"150px",height:"120px"},attrs:{src:a("e77c"),alt:""}})])])]}}])}),r("el-table-column",{attrs:{label:"标题",prop:"title"}}),r("el-table-column",{attrs:{label:"发布状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?r("el-tag",[t._v("草稿")]):t._e(),2===e.row.status?r("el-tag",{attrs:{type:"success"}},[t._v("审核通过")]):t._e(),1===e.row.status?r("el-tag",{attrs:{type:"info"}},[t._v("待审核")]):t._e(),3===e.row.status?r("el-tag",{attrs:{type:"warning"}},[t._v("审核失败")]):t._e(),4===e.row.status?r("el-tag",{attrs:{type:"danger"}},[t._v("已删除")]):t._e()]}}])}),r("el-table-column",{attrs:{label:"时间",prop:"pubdate"}}),r("el-table-column",{attrs:{label:"操作",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",plain:""},on:{click:function(a){return t.edit(e.row.id)}}}),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",plain:""},on:{click:function(a){return t.delArticle(e.row.id)}}})]}}])})],1),r("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":t.reqParams.per_page,total:t.count,"current-page":t.reqParams.page},on:{"current-change":t.changePage}})],1)],1)},n=[],l=(a("96cf"),a("1da1")),s={name:"Neirong",created:function(){console.log("发起请求"),this.getData()},methods:{getData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$http.get("articles",{params:t.reqParams});case 3:a=e.sent,r=a.data.data,t.articles=r.results,t.count=r.total_count,e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),t.$message.error("获取文章列表失败!");case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},changePage:function(t){this.reqParams.page=t,this.getData()},changeDate:function(t){""!==t&&(this.reqParams.begin_pubdate=t[0],this.reqParams.end_pubdate=t[1])},filter:function(){this.reqParams.page=1,this.getData()},edit:function(t){this.$router.push("/publish?id=".concat(t))},delArticle:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(l["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$http.delete("articles/".concat(t));case 3:e.$message.success("删除成功!"),e.getData(),a.next=10;break;case 7:a.prev=7,a.t0=a["catch"](0),e.$message.error("删除失败!");case 10:case"end":return a.stop()}}),a,null,[[0,7]])})))).catch((function(){}))}},data:function(){return{reqParams:{status:null,channel_id:null,begin_pubdate:null,end_pubdate:null,page:1,per_page:20},date:[],articles:[],count:0}}},c=s,i=a("2877"),o=Object(i["a"])(c,r,n,!1,null,"74a68426",null);e["default"]=o.exports},e77c:function(t,e,a){t.exports=a.p+"img/error.3f7b1f94.gif"}}]);
//# sourceMappingURL=chunk-8c98b810.46d66fdc.js.map