<template>
  <div>
    <div>
      <p>请选择要进行的功能</p>
      <a-select style="width: 120px" @change="handleSelect">
        <a-select-option v-for="(config,i) in configs" :value="i" v-bind:key="i">
          {{ config.desc }}
        </a-select-option>
      </a-select>
      <div v-for="param in params">
        <p>{{ param.name }}</p>
        <div>
          <a-input v-if="param.type==='string'" v-model="param.value"></a-input>
        </div>
      </div>
    </div>
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
          <a-input v-model="form.params[i]"/>
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
      <pdf
        ref="pdf"
        src="http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf">
      </pdf>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'HelloWorld',
  components:{
    pdf
  },
  data() {
    return {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      msg: 'Welcome to Your Vue.js App',
      configs: [
        {
          name: 'name',
          desc: 'desc',
          params: [
            {
              name: 'test',
              desc: 'test',
              type: 'string',
              values: '',
              value: 'test',
            },
            {
              name: 'test',
              desc: 'test',
              type: 'string',
              values: '',
              value: 'test',
            },
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
      }
    }
  },
  methods: {
    a: function () {
      let _this = this
      this.$axios.get('/hello').then(e => {
        _this.msg = e.data
      })
    },
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
    }
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
