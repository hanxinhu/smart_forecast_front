<template>
  <div>
    <div>
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="选择选择执行的功能">
          <a-radio-group v-model="form.type" @change="handleSelect" default-value="0">
            <a-radio-button v-for="(config,i) in configs" :value="i" v-bind:key="i">{{config.desc}}</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-for="(param,i) in params" :label="param.desc" v-bind:key="i">
          <a-input v-if="param.type==='string'" v-model="form.params[i]"/>
          <a-input-number v-if="param.type==='number'" v-model="form.params[i]"/>
          <a-auto-complete v-if="param.type==='list'" v-model="form.params[i]" :data-source="param.values">
          </a-auto-complete>
          <a-select v-if="param.type==='select'"  v-model="form.params[i]">
           <a-select-option v-for="obj in param.key_values" :value="obj.key" :key="obj.key">
              {{obj.value}}
           </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-button type="primary" @click="submit">
          确认
        </a-button>
        <a-button type="primary" @click="getResult">展示结果</a-button>
      </a-form-model>
    </div>
    <div>
      <a-button @click="previous">上一步</a-button>
      <a-button @click="next">下一步</a-button>
    </div>
    <div>
      <img :src="imgUrl">
    </div>
  </div>
</template>

<script>

  import AFormItem from "ant-design-vue/es/form/FormItem";
  import AFormModelItem from "ant-design-vue/es/form-model/FormItem";
  import ARadioGroup from "ant-design-vue/es/radio/Group";
  import ARadioButton from "ant-design-vue/es/radio/RadioButton";
  export default {
    name: 'HelloWorld',
    components: {ARadioButton, ARadioGroup, AFormModelItem, AFormItem},
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
            target: 'target',
            params: [
              {
                name: 'test',
                desc: 'testString',
                type: 'string',
                values: '',
                value: 'test',
                key_values:[{
                  key:'key',
                  value:'value',
                }],
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
          target: '',
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

      handleSelect: function (e) {
        console.log(e);
        console.log(this.form);
        e = e.target.value;
        this.imgUrl = null;
        this.form.params = [];
        this.params = this.configs[e].params;
        this.form.name = this.configs[e].name;
        this.form.desc = this.configs[e].desc;
        this.form.target = this.configs[e].target;
        console.log(this.form)
      },
      submit: function (e) {
        e.preventDefault();
        let _this = this;
        console.log(this.form);
        this.$message.success("成功提交计算任务，请等待片刻查看结果");
        this.$axios.post('/run', this.form).then(e => {
          console.log(e);
          _this.form.params = _this.form.params.map(e=>'')
        });
      },
      getResult: function (e) {
        e.preventDefault()
        console.log(this.form);
        let _this = this
        this.$axios.post('get_result', this.form).then(e => {
          console.log(e)
          if(e.data.startsWith('data:'))
          {
            _this.imgUrl = e.data
          }else{
            _this.$message.info(e.data)
          }
        })
      }
      ,
      next: function () {
        this.imgUrl = null;
        this.form.params = [];
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
      previous: function () {
        let i = 0;
        this.imgUrl = null;
        this.form.params = [];
        for (; i < this.configs.length; i++) {
          if (this.configs[i].name === this.form.name) {
            break;
          }
        }

        if (i - 1 >= 0) {
          this.form.name = this.configs[i - 1].name;
          this.form.desc = this.configs[i - 1].desc;
          this.params = this.configs[i - 1].params;
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
