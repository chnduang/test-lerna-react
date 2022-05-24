(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{444:function(e,t,a){"use strict";a.r(t);var n=a(18),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"react-是如何创建-vdom和fibertree"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-是如何创建-vdom和fibertree"}},[e._v("#")]),e._v(" React 是如何创建 vdom和fibertree")]),e._v(" "),a("blockquote",[a("p",[a("a",{attrs:{href:"https://mp.weixin.qq.com/s/FiLovdQ9pivkRxzr-7QMsA",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://mp.weixin.qq.com/s/FiLovdQ9pivkRxzr-7QMsA"),a("OutboundLink")],1)])]),e._v(" "),a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[e._v("#")]),e._v(" 前言")]),e._v(" "),a("p",[e._v("本篇文章作为react源码分析与优化写作计划的第一篇，分析了react是如何创建vdom和fiber tree的。本篇文章通过阅读react 16.8及以上版本源码以及参考大量分析文章写作而成，react框架本身算法以及架构层也是不断的在优化，所以源码中存在很多"),a("code",[e._v("legacy")]),e._v("的方法，不过这并不影响我们对于react设计思想的学习和理解。")]),e._v(" "),a("p",[e._v("阅读源码一定要带着目的性的去展开，这样就会减少过程中的枯燥感，而写作能够提炼和升华自己的学习和理解，这也是本篇以及后续文章的动力所在。如果写作的文章还能够帮助到其他开发者，那就更好了。")]),e._v(" "),a("h2",{attrs:{id:"jsx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jsx"}},[e._v("#")]),e._v(" JSX")]),e._v(" "),a("p",[e._v("首先，来看一个简单的 React 组件。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"App\">\n      <h1>Hello React</h1>\n    </div>\n  );\n}\n")])])]),a("p",[e._v("上面常用的语法称之为 JSX，是 "),a("code",[e._v("React.createElement")]),e._v(" 方法的语法糖，使用 JSX 能够直观的展现 UI 及其交互，实现关注点分离。")]),e._v(" "),a("p",[e._v("每个 react 组件的顶部都要导入 React，因为 JSX 实际上依赖 Babel（@babel/preset-react）来对语法进行转换，最终生成"),a("code",[e._v("React.createElemnt")]),e._v("的嵌套语法。")]),e._v(" "),a("p",[e._v("下方能够直观的看到 JSX 转换后的渲染结果。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function App() {\n  return React.createElement(\n    'div',\n    {\n      className: 'App',\n    },\n    React.createElement('h1', null, 'Hello React')\n  );\n}\n")])])]),a("h2",{attrs:{id:"createelement"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#createelement"}},[e._v("#")]),e._v(" createElement")]),e._v(" "),a("p",[a("code",[e._v("createElement()")]),e._v("方法定义如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("React.createElement(type, [props], [...children]);\n")])])]),a("p",[a("code",[e._v("createElement()")]),e._v("接收三个参数，分别是元素类型、属性值以及子元素，它最终会生成 Virtual DOM。")]),e._v(" "),a("p",[e._v("我们将上面的"),a("code",[e._v("<App />")]),e._v("组件内容打印到控制台中。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH44TYNZeB1rq1N7PSx4p54sIZ0VyYRjFsjgGQyicbsOl2XZofMx3RmCib9PwTYfsg8X9Nb6Lt1hdZy5w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),e._v(" "),a("p",[e._v("可以看到 Virtual DOM 本质上是 JS 对象，将节点信息通过键值对的方式存储起来，同时使用嵌套来表示节点间的层级关系。使用 VDOM 能够避免频繁的进行 DOM 操作，同时也为后面的 React Diff 算法创造了条件。现在回到"),a("code",[e._v("createElement()")]),e._v("方法，来看一下它究竟是如何生产 VDOM 的。")]),e._v(" "),a("p",[a("strong",[e._v("createElement()方法精简版（v16.8）")])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH44TYNZeB1rq1N7PSx4p54sIHCevp0klmIYtxgImugd8cyALeMuwz4TdmbxAWDsINOnicpmDzEFibbjQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),e._v(" "),a("p",[e._v("createElement")]),e._v(" "),a("p",[e._v("首先，"),a("code",[e._v("createElement()")]),e._v("方法会先通过遍历"),a("code",[e._v("config")]),e._v("获取所有的参数，然后获取其子节点以及默认的"),a("code",[e._v("props")]),e._v("的值。然后将值传递给"),a("code",[e._v("ReactElement()")]),e._v("调用并返回 JS 对象。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH44TYNZeB1rq1N7PSx4p54sIgUfwiank47NbcWicZ7zFPN0PWX9PRUDTprCXtp3woZynM6wDRiaXChMyw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),e._v(" "),a("p",[e._v("ReactElement")]),e._v(" "),a("p",[e._v("值得注意的是，每个 react 组件都会使用"),a("code",[e._v("$$typeof")]),e._v("来标识，它的值使用了"),a("code",[e._v("Symbol")]),e._v("数据结构来确保唯一性。")]),e._v(" "),a("h2",{attrs:{id:"reactdom-render"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reactdom-render"}},[e._v("#")]),e._v(" ReactDOM.render")]),e._v(" "),a("p",[e._v("到目前为止，我们得到了 VDOM，react通过协调算法（reconciliation）去比较更新前后的VDOM，从而找到需要更新的最小操作，减少了浏览器多次操作DOM的成本。但是，由于使用递归的方式来遍历组件树，当组件树越来越大，递归遍历的成本就越高。这样，由于持续占用主线程，像布局、动画等任务无法立即得到处理，就会出现丢帧的现象。所以，为不同类型的任务赋予优先级，同时支持任务的暂停、中止与恢复，是非常有必要的。")]),e._v(" "),a("p",[e._v("为了解决上面存在的问题，React团队给出了React Fiber算法以及fiber tree数据结构（基于单链表的树结构），而"),a("code",[e._v("ReactDOM.render")]),e._v("方法就是实现React Fiber算法以及构建fiber tree的核心API。")]),e._v(" "),a("p",[a("code",[e._v("render()")]),e._v("方法定义如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ReactDOM.render(element, container[, callback])\n")])])]),a("p",[e._v("这里重点从源码层面讲解下"),a("code",[e._v("ReactDOM.render")]),e._v("是如何构建fiber tree的。")]),e._v(" "),a("p",[a("code",[e._v("ReactDOM.render")]),e._v("实际调用了"),a("code",[e._v("legacyRenderSubtreeIntoContainer")]),e._v("方法，调用过程以及传参如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ReactDOM = {\n  render(element, container, callback) {\n    return legacyRenderSubtreeIntoContainer(\n      null,\n      element,\n      container,\n      false,\n      callback\n    );\n  },\n};\n")])])]),a("p",[e._v("其中的"),a("code",[e._v("element")]),e._v("和"),a("code",[e._v("container")]),e._v("我们都很熟悉了，而"),a("code",[e._v("callback")]),e._v("是用来渲染完成后需要执行的回调函数。再来看看该方法的定义。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function legacyRenderSubtreeIntoContainer(\n  parentComponent,\n  children,\n  container,\n  forceHydrate,\n  callback\n) {\n  let root = container._reactRootContainer;\n  let fiberRoot;\n  // 初次渲染\n  if (!root) {\n    // 初始化挂载，获得React根容器对象\n    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(\n      container,\n      forceHydrate\n    );\n    fiberRoot = root._internalRoot;\n\n    // 初始化安装不需要批量更新，需要尽快完成\n    unbatchedUpdates(() => {\n      updateContainer(children, fiberRoot, parentComponent, callback);\n    });\n  } else {\n    fiberRoot = root._internalRoot;\n\n    updateContainer(children, fiberRoot, parentComponent, callback);\n  }\n  return getPublicRootInstance(fiberRoot);\n}\n")])])]),a("p",[e._v("上面是简化后的源码。先来看传参，因为是挂载"),a("code",[e._v("root")]),e._v("，所以"),a("code",[e._v("parentComponent")]),e._v("设置为"),a("code",[e._v("null")]),e._v("。另外一个参数"),a("code",[e._v("forceHydrate")]),e._v("代表是否是服务端渲染，因为调用的"),a("code",[e._v("render()")]),e._v("方法为客服端渲染，所以默认为"),a("code",[e._v("false")]),e._v("。另外"),a("code",[e._v("callback")]),e._v("使用少，所以关于它的处理过程就省略了。")]),e._v(" "),a("p",[e._v("因为是首次挂载，所以"),a("code",[e._v("root")]),e._v("从"),a("code",[e._v("container._reactRootContainer")]),e._v("获取不到值，就会创建"),a("code",[e._v("FiberRoot")]),e._v("对象。在"),a("code",[e._v("FiberRoot")]),e._v("对象创建过程中考虑到了服务端渲染的情况，并且函数之间相互调用非常多，所以这里直接展示其最终调用的核心方法。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// 创建fiberRoot和rootFiber并相互引用\nfunction createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {\n  const root = new FiberRootNode(containerInfo, tag, hydrate);\n  if (enableSuspenseCallback) {\n    root.hydrationCallbacks = hydrationCallbacks;\n  }\n\n  // 创建fiber tree的根节点，即rootFiber\n  const uninitializedFiber = createHostRootFiber(tag);\n  root.current = uninitializedFiber;\n  uninitializedFiber.stateNode = root;\n\n  initializeUpdateQueue(uninitializedFiber);\n\n  return root;\n}\n")])])]),a("p",[e._v("在该方法中"),a("code",[e._v("containerInfo")]),e._v("就是"),a("code",[e._v("root")]),e._v("节点，而"),a("code",[e._v("tag")]),e._v("为"),a("code",[e._v("FiberRoot")]),e._v("节点的标记，这里为"),a("code",[e._v("LegacyRoot")]),e._v("。另外两个参数和服务端渲染有关。这里使用"),a("code",[e._v("FiberRootNode")]),e._v("方法创建了"),a("code",[e._v("FiberRoot")]),e._v("对象，并使用"),a("code",[e._v("createHostRootFiber")]),e._v("方法创建"),a("code",[e._v("RootFiber")]),e._v("对象，使"),a("code",[e._v("FiberRoot")]),e._v("中的"),a("code",[e._v("current")]),e._v("指向"),a("code",[e._v("RootFiber")]),e._v("，"),a("code",[e._v("RootFiber")]),e._v("的"),a("code",[e._v("stateNode")]),e._v("指向"),a("code",[e._v("FiberRoot")]),e._v("，形成相互引用。")]),e._v(" "),a("p",[e._v("下面的两个构造函数是展现出了fiberRoot以及rootFiber的部分重要的属性。")]),e._v(" "),a("p",[e._v("FiberRootNode部分属性:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function FiberRootNode(containerInfo, tag, hydrate) {\n  // 用于标记fiberRoot的类型\n  this.tag = tag;\n  // 指向当前激活的与之对应的rootFiber节点\n  this.current = null;\n  // 和fiberRoot关联的DOM容器的相关信息\n  this.containerInfo = containerInfo;\n  // 当前的fiberRoot是否处于hydrate模式\n  this.hydrate = hydrate;\n  // 每个fiberRoot实例上都只会维护一个任务，该任务保存在callbackNode属性中\n  this.callbackNode = null;\n  // 当前任务的优先级\n  this.callbackPriority = NoPriority;\n}\n")])])]),a("p",[e._v("Fiber Node构造函数的部分属性:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("function FiberNode(tag, pendingProps, key, mode) {\n  // rootFiber指向fiberRoot，child fiber指向对应的组件实例\n  this.stateNode = null;\n  // return属性始终指向父节点\n  this.return = null;\n  // child属性始终指向第一个子节点\n  this.child = null;\n  // sibling属性始终指向第一个兄弟节点\n  this.sibling = null;\n  // 表示更新队列，例如在常见的setState操作中，会将需要更新的数据存放到updateQueue队列中用于后续调度\n  this.updateQueue = null;\n  // 表示当前更新任务的过期时间，即在该时间之后更新任务将会被完成\n  this.expirationTime = NoWork;\n}\n")])])]),a("p",[e._v("最终生成的fiber tree结构示意图如下：")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH44TYNZeB1rq1N7PSx4p54sIngKLloicBGoyVB3sBqMpN5XFtOMUp9XIreLgeYMoVlewyNk842GG1Yw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1",alt:"图片"}})]),e._v(" "),a("p",[e._v("fiber树结构示意图")]),e._v(" "),a("h2",{attrs:{id:"react-diff-算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-diff-算法"}},[e._v("#")]),e._v(" React Diff 算法")]),e._v(" "),a("p",[e._v("react 并不会比原生操作 DOM 快，但是在大型应用中，往往不需要每次全部重新渲染，这时 react 通过 VDOM 以及 diff 算法能够只更新必要的 DOM。react 将 VDOM 与 diff 算法结合起来并对其进行优化，提供了高性能的 React Diff 算法，通过一系列的策略，将传统的 diff 算法复杂度 O(n^3)优化为 O(n)的复杂度，极大的提升了渲染性能。")]),e._v(" "),a("p",[e._v("这里不展开探究 React Diff 的具体实现原理，而先了解下它到底的基于什么策略来实现的。")]),e._v(" "),a("ol",[a("li",[e._v("Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。")]),e._v(" "),a("li",[e._v("拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。")]),e._v(" "),a("li",[e._v("对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。")])]),e._v(" "),a("p",[e._v("基于这三个策略，react 在 tree diff 和 component diff 中，两棵树只会对同层次的节点进行比较。如果同层级的树发生了更新，则会将该节点及其子节点同时进行更新，这样避免了递归遍历更加深入的节点的操作。在后面渲染性能优化部分，对于同一类型的组件如果能够准确的知道 VDOM 是否变化，使用"),a("code",[e._v("shouldComponentUpdate")]),e._v("来判断该组件是否需要 diff，能够节省大量的 diff 运算时间。")]),e._v(" "),a("p",[e._v("当 react 进行 element diff 操作中，在元素中添加唯一的"),a("code",[e._v("key")]),e._v("来进行区分，对其进行算法优化。所以像大数据量的列表之类的组件中最好添加"),a("code",[e._v("key")]),e._v("属性，能够带来一定的性能提升。")])])}),[],!1,null,null,null);t.default=r.exports}}]);