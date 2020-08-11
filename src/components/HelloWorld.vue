<template>
  <div>
    <div>
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="请选择要执行的功能">
          <a-select v-model="form.desc" @change="handleSelect">
            <a-select-option v-for="(config,i) in configs" :value="i" v-bind:key="i">
              {{ config.desc }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-for="(param,i) in params" :label="param.desc" v-bind:key="i">
          <a-input v-if="param.type==='string'" v-model="form.params[i]"/>
          <a-input-number v-if="param.type==='number'" v-model="form.params[i]"/>
          <a-auto-complete v-if="param.type==='list'" v-model="form.params[i]" :data-source="param.values">
          </a-auto-complete>
        </a-form-model-item>
        <a-button type="primary" @click="submit">
          确认
        </a-button>
      </a-form-model>
    </div>
    <div>
      <a-button @click="next">下一步
      </a-button>
    </div>
    <div>
      <img :src="imgUrl">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',

    data() {
      return {
        labelCol: {span: 4},
        wrapperCol: {span: 12},
        msg: 'Welcome to Your Vue.js App',
        imgUrl: null,
        configs: [
          {
            name: 'name',
            desc: 'desc',
            params: [
              {
                name: 'test',
                desc: 'testString',
                type: 'string',
                values: '',
                value: 'test',
              },
              {
                name: 'test',
                desc: 'testNumber',
                type: 'number',
                values: '',
                value: 'test',
              },
              {
                name: 'test',
                desc: 'testList',
                type: 'list',
                values: ['1', '2', '3'],
                value: 'test',
              }
            ]
          },
          {
            name: 'name2',
            desc: 'desc2',
          }
        ],
        params: [],
        form: {
          name: '',
          desc: '',
          params: [],
        },
        tempInput: '',
      }
    },
    created() {
      this.init();
    }
    ,
    methods: {
      init: function () {
        let _this = this
        this.$axios.get('/init').then(e => {
          _this.configs = e.data

        })
      },
      // getFile: function () {
      //   let _this = this
      //   this.$axios.get('/file').then(e => {
      //     _this.pdfFile = e.data
      //   })
      // },
      handleSelect: function (e) {
        console.log(e)
        console.log(this.form)
        this.form.name = this.configs[e].name;
        this.form.desc = this.configs[e].desc;
        this.params = this.configs[e].params;
      },
      submit: function (e) {
        e.preventDefault();
        console.log(this.form)
        if (this.form.name === this.configs
          [1].name) {
          this.imgUrl = 'http://localhost:5000/file'
        }
        if(this.form.name === this.configs[2].name){
          this.imgUrl = 'http://localhost:5000/file1'
        }
        this.$message.success("成功提交")
        this.$axios.post('/run',this.form).then(e => {
          console.log('ok')
        });
        this.form.params = []
      },
      next: function () {
        let i = 0;

        for (; i < this.configs.length; i++) {
          if (this.configs[i].name === this.form.name) {
            break;
          }
        }

        if (i + 1 < this.configs.length) {
          this.form.name = this.configs[i + 1].name;
          this.form.desc = this.configs[i + 1].desc;
          this.params = this.configs[i + 1].params;
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
