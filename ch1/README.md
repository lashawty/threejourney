# 壹、Basics WebGL Three JS 簡介

###### tags: three


---

## WebGL?

WebGL是JS的一個API，利用極快的速度渲染三角形在canvas上，且跟大部分現代瀏覽器相容，它是依賴使用者的GPU去渲染出畫面。而學習原生WebGL的成本極高，必須有一定的數學基礎等等，簡單來說就是超難，例如shaders(著色器)以及matrices(數學矩陣)。所以才需要**Three.js**

[GPU在幹嘛?](https://www.gigabyte.com/tw/Glossary/gpu)
[甚麼是shader?](https://ithelp.ithome.com.tw/articles/10238006)

## WebGL救星：Three.js

簡單來說，three.js的目標就是徹底簡化WebGL的code（幾百行變成幾行的等級），加上three.js是直接針對WebGL最底層的library，所以還是可以針對shaders跟matrcies進行控制。


## 安裝

npm create vite@latest (使用vite打包)
npm i three
npm run dev

```
import * as THREE from 'three'
```

## 必備元素

### Scene 場景 類似container

```
const scene = new THREE.Scene()
```

### Objects 物件 可以是很多東西，例如正方體或3D模型


```
// 位置(x, y, z)
const geometry = new THREE.BoxGeometry(1, 1, 1)

// 材質、顏色
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// 帶入設定好的參數 帶入後的物件稱為 mesh
const mesh = new THREE.Mesh(geometry, material)

// 將 mesh 加入場景
scene.add(mesh)
```

### Camera 類似視野，可調遠近

```
// 利用物件定義寬高
const sizes = {
    width: 800,
    height: 600
}

// 帶入相機 (角度, 寬高比)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3 //拉遠相機，預設是0，等於相機還被包在物件裡，不一定每次都是z，x,y,z皆可調整
scene.add(camera)
```

### Renderer 渲染器

```
// 目前先到html建立canvas標籤，並且query該標籤
const canvas = document.querySelector('canvas.webgl')

// 帶入該標籤
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// 設定canvas的寬高
renderer.setSize(sizes.width, sizes.height)
```

## Render 渲染出設定好的東西

```
// 帶入參數(場景, 視野)
renderer.render(scene, camera)
```

## 成果

![](https://i.imgur.com/Yus09Bn.png)

```
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```