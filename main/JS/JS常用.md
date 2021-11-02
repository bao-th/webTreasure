# 对象

## 判断类型

```js
typeof [] == "object";
/*
 无兼容性问题
 '[object String]' - 字符串
 '[object Number]' - 数字
 '[object Boolean]' - 布尔
 '[object Null]' - Null
 '[object Undefined]' - Undefined
 '[object Object]' - 对象
 '[object Array]' - 数组
 '[object Function]' - 函数
*/
Object.prototype.toString.call(a) === "[object Function]";
//判断数组
Array.isArray(); // es6 语法

Object.prototype.valueOf(); // 返回对象的原始值
{} instanceof Object; // 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
```

## 对象原型、构造函数、proto

```js
obj = {
  __proto__: null, // -- > 创建该对象的构造函数的原型prototype，存放引用
};
(__proto__) => (constructor) => prototype;

var a = new Object.create(null); //啥都没有的对象
```

## 对象遍历

1. for in

- for in 的循环顺序，参考【JavaScript 权威指南】（第七版）6.6.1。

  - 先列出名字为非负整数的字符串属性，按照数值顺序从最小到最大。这条规则意味着数组和类数组对象的属性会按照顺序被枚举。
  - 在列出类数组索引的所有属性之后，在列出所有剩下的字符串名字（包括看起来像整负数或浮点数的名字）的属性。这些属性按照它们添加到对象的先后顺序列出。对于在对象字面量中定义的属性，按照他们在字面量中出现的顺序列出。
  - 最后，名字为符号对象的属性按照它们添加到对象的先后顺序列出。

2. Object.keys
3. Object.values
4. Object.entries
5. Object.getOwnPropertyNames

## 对象

```js
Object.assign(obj1, obj2); // 会改变obj1
Object.entries({}); // 对象转迭代 ，返回[[], []]
Object.fromEntries([[], []]); // 迭代转对象 ，与上面相反操作
new Map([[], []]); // 转Map
```

---

# 数组

## 类数组转数组方法

```js
[...类数组];
Array.from(arrayLike, (x) => x * x);
// 等同于
Array.from(arrayLike).map((x) => x * x);
Array.prototype.slice.apply(arguments);
```

## 数组去重

```js
Array.from(new Set([1, 1, 2, 2]), null /*类似map中对每个元素的处理 */);
```

## Reduce()方法

```js
[65, 4, 12, 4].reduce((total, num, index, arr) => {
  //求和
  return total + num;
}, 0 /* total 初始值 */);
```

## 数组分割拼接

```js
splice(index, howmany, item1, /_ ..., _/ itwmX) // 改变原数组，从数组中添加/删除项目，然后返回被删除的项目
slice(start, end) // 不改变原数组，返回含有分割元素的数组, 默认：start:0,end:length
concat() // 不改变原数组,返回新数组，浅拷贝
join() // 默认以','拼接成字符串

```

## Array.flat()、Array.flatMap()

- flat(深度)：用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响
- flat(Infinity)：不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数；
- flatMap()：只能展开一层数组，先执行 map，再 flat；

## 循环遍历

1. for、forEach、for ...of

   - 三者都是基本的由左到右遍历数组
   - forEach 无法跳出循环；for 和 for ..of 可以使用 break 或者 continue 跳过或中断。
   - for ...of 直接访问的是实际元素。for 遍历数组索引，forEach 回调函数参数更丰富，元素、索引、原数组都可以获取。
   - for ...of 与 for 如果数组中存在空元素，同样会执行。

2. some、every
   - 二者都是用来做数组条件判断的，都是返回一个布尔值
   - 二者都可以被中断
   - some 若某一元素满足条件，返回 true，循环中断；所有元素不满足条件，返回 false。
   - every 与 some 相反，若有益元素不满足条件，返回 false，循环中断；所有元素满足条件，返回 true。
3. filter、map
   - 二者都是生成一个新数组，都不会改变原数组（不包括遍历对象数组是，在回调函数中操作元素对象）
   - 二者都会跳过空元素。有兴趣的同学可以自己打印一下
   - map 会将回调函数的返回值组成一个新数组，数组长度与原数组一致。
   - filter 会将符合回调函数条件的元素组成一个新数组，数组长度与原数组不同。
   - map 生成的新数组元素是可自定义。
   - filter 生成的新数组元素不可自定义，与对应原数组元素一致。
4. find、findIndex
   - 二者都是用来查找数组元素。
   - find 方法返回数组中满足 callback 函数的第一个元素的值。如果不存在返回 undefined。
   - findIndex 它返回数组中找到的元素的索引，而不是其值，如果不存在返回 -1。
5. reduce、reduceRight
   - 第一个参数是回调函数（callback） ，第二个参数是初始值（initialValue）
   - 回调函数接收四个参数：
     1. accumulator：MDN 上解释为累计器，但我觉得不恰当，按我的理解它应该是截至当前元素，之前所有的数组元素被回调函数处理累计的结果。
     2. current：当前被执行的数组元素。
     3. currentIndex: 当前被执行的数组元素索引。
     4. sourceArray：原数组，也就是调用 reduce 方法的数组。
   - 如果不传入初始值，reduce 方法会从索引 1 开始执行回调函数，如果传入初始值，将从索引 0 开始、并从初始值的基础上累计执行回调。

---

# 字符串

## 字符串操作

```js
concat();
slice(start, end); //负数时全部倒数
substring(start, end); // 负数全部为 0,可以按从小到大颠倒
substr(start, length); // 第一个负数倒数，第二个负数为 0
// 全都不改变原字符串

match(); // 正则查找
search(); // 正则查找
replace(); // 正则替换
split(分隔符, 数组长度); // 分割字符串为数组
var colorText = "red,blue,green,yellow";
var colors1 = colorText.split(","); //["red", "blue", "green", "yellow"]
var colors2 = colorText.split(",", 2); //["red", "blue"]
var colors3 = colorText.split(/[^\,]+/); //["", ",", ",", ",", ""]
```

---

# 函数

## 函数声明

- 局部变量会“遮蔽”全局变量
- 变量声明会提前，函数声明也会提前，函数表达式不能提升，函数比变量声明优先提升
- 不加 var 将定义全局变量

## arguments

- 实参列表，类数组对象，不能调用数组的方法

## 立即执行函数 IIFE(立即调用函数表达式)：

```js
(function () {
  statements;
})();

+(function () {
  statements;
})();

-(function () {
  statements;
})();
```

## sort()函数

```js
// a:靠前项,b:靠后项
// 返回任意正数,交换位置；否则返回负数
[1, 2, 3, 4, 5].sort(function (a, b) {
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
});
```

---

# 其他

## 运算符

```js
// 在关系运算符中，null，undefined会被Number()强制转换成数字类型；
null >= 0; //true，Number(null)==0
undefined >= 0; //false，Number(undefined)==NaN

// 在相等运算符中，null，undefined则不会转化为数字类型，而是经过特殊处理后转化为false
// （当然，除了与自身对比，或者是null与undefined对比，即都为true）
null == 0; //false
undefined == 0; //false
```

## 基本方法

```js
parseInt(string, radix);
// ? radix：进制基数，2~36之间，小于2或大于36都返回NaN，string小于10时，string大于等于基数radix，返回NaN
// ? 先看string是否在进制范围内，如果存在不在范围内的字符去掉后，在计算进制
// ? 如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数
// 例：
parseInt("25", 8); //21
//'25'分为2和5，然后和8比较，均比8小
//计算:2和5的索引分别为 1，0。计算方法为2乘以8的1次方加上5乘以8的0次方
//计算公式：2*8^1+5*8^0=21
parseInt("292", 8); //2
//'292'分为2和9，然后和8比较，当大于等于8时后面的数字（包含自己）截去，所以从9开始截去，只剩2
//计算:2的索引为 0。计算方法为2乘以8的0次方
//计算公式：2*8^0=2
parseInt("9", 8);
//当第一个数就比参数大时，返回NAN
```

## 引用类型在比较运算符时候,隐式转换会调用本类型 toString 或 valueOf 方法

```js
var a = {
  i: 1,
  toString() {
    return a.i++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
// 或
let a = [1, 2, 3];
a.toString = a.shift;
console.log(a.shift);
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}
```

## eval()与 new Function()

- eval(): 参数可以为局部变量
- new Function(): 参数为全局变量

## ^: 异或运算

```js
let a = 1,
  b = 2;
a ^ (a == 0);
a ^ (0 == a);
// 满足交换律、结合律
a ^ b ^ (a == b) ^ a ^ (a == b) ^ ((a ^ a) == b) ^ (0 == b);
```
