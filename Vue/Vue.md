# Vue

## 模板语法

1. 插值语法
   - 功能：用于解析标签体内容。
   - 写法：`{{xxx}}`，xxx 是 js 表达式，且可以直接读取到 data 中的所有属性。
2. 指令语法
   - 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
   - 举例；`v-bind:href="xxx"` 或简写为 `:href="xxx"`，xxx 同样要写 js 表达式，且可以直接读取到 data 中的属性。
   - 双向绑定：`v-model`
   - 备注：Vue 中有很多的指令，且形式都是：v-???，此处我们只是拿 v-bind 举个例子。

---

## MVVM 模型

1. M：模型（Model）：data 中的数据
2. V：视图（View）：模板代码
3. VM：视图模型（ViewModel）：Vue 实例

- 观察发现：

1. data 中的所有属性，最后都出现在了 vm 身上。
2. vm 身上所有属性 及 Vue 原型上的所有属性，在 Vue 模板中都可以直接使用。

---

## 数据代理

### Object.defineProperty

```js
let number = 18;
let person = {
  name: "张三",
  sex: "男",
};
Object.defineProperty(person, "age", {
  value: 18,
  enumerable: true, //是否可枚举，默认false
  writable: true, //是否可修改，默认false
  configurable: true, //是否可被删除，默认false
  //有人读取person的age属性时，get函数（getter）就会被调用，且返回值就是age的值
  get() {
    console.log("有人读取age属性了");
    return number;
  },
  //有人修改person的age属性时，set函数（setter）就会被调用，且会收到修改的具体值
  set(value) {
    console.log("有人修改了age属性，且值是", value);
    number = value;
  },
});
```

### 数据代理

1. Vue 中的数据代理：
   - 通过 vm 对象来代理 data 对象中属性的操作（读/写）
2. Vue 中数据代理的好处：
   - 更加方便的操作 data 中的数据
3. 基本原理：
   - 通过 Object.defineProperty()把 data 对象中的所有属性添加到 vm 上。
   - 为每一个添加到 vm 上的属性，都指定一个 getter/setter。
   - 在 getter/setter 内部去操作（读/写）data 中对应的属性。

---

## 事件处理

### 事件的基本使用

1. 使用 v-on:xxx 或@xxx 绑定事件，其中 xxx 是事件名；
2. 事件的回调需要配置在 methods 对象中，最终会在 vm 上；
3. methods 中配置的函数，不要使用箭头函数，否则 this 就不是 vm 了，是 window 了；
4. methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 组件实例对象；
5. @click="demo"和@click="demo($event)"效果一致，但后者可以传参；

### 事件修饰符

1. prevent：阻止默认事件（常用）；
2. stop：阻止事件冒泡（常用）；
3. once：事件只触发一次（常用）；
4. capture：使用事件的捕获模式；
5. self：只有 event.target 是当前操作的元素时才触发事件；
6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

### Vue 中常用的按键别名

1. Vue 中常用的按键别名：

   1. 回车 => enter
   2. 删除 => delete（捕获“删除”和“退格”键）
   3. 退出 => esc
   4. 空格 => space
   5. 换行 => tab (特殊，必须配合 keydown 去使用)
   6. 上 => up
   7. 下 => down
   8. 左 => left
   9. 右 => right

2. Vue 未提供别名的按键，可以使用按键原始的 key 值去绑定，但注意要转为 kebab-case（短横线命名）
3. 系统修饰键（用法特殊）：ctrl、alt、shift、meta
   - (1).配合 keyup 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
   - (2).配合 keydown 使用：正常触发事件。
4. 也可以使用 keyCode 去指定具体的按键（不推荐）
5. Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

---

## 计算属性

1. 定义：要用的属性不存在，要通过`已有属性data`计算得来。
2. 原理：底层借助了 Objcet.defineproperty 方法提供的 getter 和 setter。
3. get 函数什么时候执行？
   - (1).初次读取时会执行一次。
   - (2).当依赖的数据发生改变时会被再次调用。
4. 优势：与 methods 实现相比，内部有缓存机制（复用），效率更高，调试方便。
5. 备注：
   1. 计算属性最终会出现在 vm 上，直接读取使用即可。
   2. 如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

```js
new Vue({
  el: "#root",
  data: {
     firstName:'张'，
     lastName:'三'
  },
  computed: {
    //完整写法
    fullName: {
      //get()有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
      //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
      get() {
        return this.firstName + "-" + this.lastName;
      },
      //set什么时候调用？当fullName被修改时。
      set(value){
        const arr = value.split('-')
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    },
    //简写
    fullName() {
        return this.firstName + "-" + this.lastName;
    }
  },
});
```

---

## 监视（侦听）属性

1. 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
2. 监视的属性必须存在，才能进行监视！！
3. 监视的两种写法：
   - (1).new Vue 时传入 watch 配置
   - (2).通过 vm.$watch 监视

### 深度监视：

- (1).Vue 中的 watch 默认不监测对象内部值的改变（一层）。
- (2).配置 deep:true 可以监测对象内部值改变（多层）。
- 备注：
  - (1).Vue 自身可以监测对象内部值的改变，但 Vue 提供的 watch 默认不可以！
  - (2).使用 watch 时根据数据的具体结构，决定是否采用深度监视。

```js
const vm = new Vue({
  el: "#root",
  data: {
    isHot: true,
  },
  computed: {
    info() {
      return this.isHot ? "炎热" : "凉爽";
    },
  },
  watch: {
    isHot: {
      immediate: true, //初始化时让handler调用一下
      //handler什么时候调用？当isHot发生变化时。
      handler(newValue, oldValue) {},
    },
    //深度监视

    //监视多级结构中某个属性的变化
    /* 'numbers.a':{
         handler(){
            console.log('a被改变了')
         }
      } */
    //监视多级结构中所有属性的变化
    numbers: {
      deep: true,
      handler() {
        console.log("numbers改变了");
      },
    },
    //简写
    isHot(newValue, oldValue) {},
  },
});
// 或
vm.$watch("isHot", {
  immediate: true,
  handler(newValue, oldValue) {
    console.log("isHot被修改了", newValue, oldValue);
  },
});
//简写
vm.$watch("isHot", function (newValue, oldValue) {
  console.log("isHot被修改了", newValue, oldValue);
});
```

### computed 和 watch 之间的区别：

1. computed 能完成的功能，watch 都可以完成。
2. watch 能完成的功能，computed 不一定能完成，例如：watch 可以进行异步操作。

- 两个重要的小原则：
  1.  所被 Vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或 组件实例对象。
  2.  所有不被 Vue 所管理的函数（定时器的回调函数、ajax 的回调函数等、Promise 的回调函数），最好写成箭头函数，这样 this 的指向才是 vm 或 组件实例对象。

---

## 样式

- 绑定样式：
  1. class 样式
     - 写法:class="xxx" xxx 可以是字符串、对象、数组。
     - 字符串写法适用于：类名不确定，要动态获取。
     - 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
     - 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
  2. style 样式
     - :style="{fontSize: xxx}"其中 xxx 是动态值。
     - :style="[a,b]"其中 a、b 是样式对象。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>绑定样式</title>
    <style>
      .basic {
        width: 400px;
        height: 100px;
        border: 1px solid black;
      }

      .happy {
        border: 4px solid red;
        background-color: rgba(255, 255, 0, 0.644);
        background: linear-gradient(30deg, yellow, pink, orange, yellow);
      }
      .sad {
        border: 4px dashed rgb(2, 197, 2);
        background-color: gray;
      }
      .normal {
        background-color: skyblue;
      }

      .atguigu1 {
        background-color: yellowgreen;
      }
      .atguigu2 {
        font-size: 30px;
        text-shadow: 2px 2px 10px red;
      }
      .atguigu3 {
        border-radius: 20px;
      }
    </style>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器-->
    <div id="root">
      <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
      <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
      <br /><br />

      <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
      <div class="basic" :class="classArr">{{name}}</div>
      <br /><br />

      <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
      <div class="basic" :class="classObj">{{name}}</div>
      <br /><br />

      <!-- 绑定style样式--对象写法 -->
      <div class="basic" :style="styleObj">{{name}}</div>
      <br /><br />
      <!-- 绑定style样式--数组写法 -->
      <div class="basic" :style="styleArr">{{name}}</div>
    </div>
  </body>

  <script type="text/javascript">
    Vue.config.productionTip = false;

    const vm = new Vue({
      el: "#root",
      data: {
        name: "尚硅谷",
        mood: "normal",
        classArr: ["atguigu1", "atguigu2", "atguigu3"],
        classObj: {
          atguigu1: false,
          atguigu2: false,
        },
        styleObj: {
          fontSize: "40px",
          color: "red",
        },
        styleObj2: {
          backgroundColor: "orange",
        },
        styleArr: [
          {
            fontSize: "40px",
            color: "blue",
          },
          {
            backgroundColor: "gray",
          },
        ],
      },
      methods: {
        changeMood() {
          const arr = ["happy", "sad", "normal"];
          const index = Math.floor(Math.random() * 3);
          this.mood = arr[index];
        },
      },
    });
  </script>
</html>
```

---

## 条件渲染

1. v-if

   - 写法：
     - (1).v-if="表达式"
     - (2).v-else-if="表达式"
     - (3).v-else="表达式"
   - 适用于：切换频率较低的场景。
   - 特点：不展示的 DOM 元素直接被移除。
   - 注意：v-if 可以和:v-else-if、v-else 一起使用，但要求结构不能被“打断”。

2. v-show

   - 写法：v-show="表达式"
   - 适用于：切换频率较高的场景。
   - 特点：不展示的 DOM 元素未被移除，仅仅是使用样式隐藏掉

3. 备注：使用 v-if 的时，元素可能无法获取到，而使用 v-show 一定可以获取到。

---

## 列表渲染

### v-for 指令:

1. 用于展示列表数据
2. 语法：v-for="(item, index) in（或 of） xxx" :key="yyy"
3. 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

### react、vue 中的 key 有什么作用？（key 的内部原理）

1.  虚拟 DOM 中 key 的作用：

        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,
        随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

2.  对比规则：

    (1).旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key：
    ①.若虚拟 DOM 中内容没变, 直接使用之前的真实 DOM！
    ②.若虚拟 DOM 中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM。

    (2).旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
    创建新的真实 DOM，随后渲染到到页面。

3.  用 index 作为 key 可能会引发的问题：

          1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                  会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

          2. 如果结构中还包含输入类的DOM：
                  会产生错误DOM更新 ==> 界面有问题。

4.  开发中如何选择 key?: 1.最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值。 2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
    使用 index 作为 key 是没有问题的。

---

## Vue 监视数据的原理：

1.  vue 会监视 data 中所有层次的数据。

2.  如何监测对象中的数据？

        通过setter实现监视，且要在new Vue时就传入要监测的数据。
          (1).对象中后追加的属性，Vue默认不做响应式处理
          (2).如需给后添加的属性做响应式，请使用如下API：
                  Vue.set(target，propertyName/index，value) 或
                  vm.$set(target，propertyName/index，value)

3.  如何监测数组中的数据？

          通过包裹数组更新元素的方法实现，本质就是做了两件事：
            (1).调用原生对应的方法对数组进行更新。
            (2).重新解析模板，进而更新页面。

4.  在 Vue 修改数组中的某个元素一定要用如下方法： 1.使用这些 API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()

        2.Vue.set() 或 vm.$set()

特别注意：Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象 vm.\_data 添加属性！！！

---

## 收集表单数据
    若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
    若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
    若：<input type="checkbox"/>
        1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
        2.配置input的value属性:
            (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
            (2)v-model的初始值是数组，那么收集的的就是value组成的数组
    备注：v-model的三个修饰符：
            lazy：失去焦点再收集数据
            number：输入字符串转为有效的数字
            trim：输入首尾空格过滤
