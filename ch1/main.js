import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'
import imageSource from './img.jpg'
// Scene
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')
// Object
// Create an empty BufferGeometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
// Create 50 triangles (450 values)
// const count = 50
// const positionsArray = new Float32Array(count * 3 * 3)
// for(let i = 0; i < count * 3 * 3; i++)
// {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }

// // Create the attribute and name it 'position'
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(imageSource,
  () =>
  {
      console.log('loading finished')
  },
  () =>
  {
      console.log('loading progressing')
  },
  () =>
  {
      console.log('loading error')
  }
  )
  // texture.repeat.x = 2
  // texture.repeat.y = 3
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  // texture.offset.x = 0.5
  // texture.offset.y = 0.5
  texture.rotation = Math.PI * 0.5
const material = new THREE.MeshBasicMaterial(
  {
    // color: 0xff0000,
    // wireframe: true
    map: texture
  })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// debug UI
const gui = new dat.GUI()
gui.add(mesh.position, 'y', - 3, 3, 0.01)
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

const parameters = {
  color: 0xff0000,
  spin: () =>
  {
      gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }
}

gui.add(parameters, 'spin')
//移動物件
//也可以使用set(x, y, z) <= 向量

//position 向量
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
mesh.position.set(0, 0, 0)

//scale 向量
mesh.scale.set(.5, .5, .5)

//rotation euler => 歐拉角(三維角度)
// 改變euler時可能會帶來一些問題 google: gimbal lock
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

//位置小幫手 可帶入參數 (長度)
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
// field of view 常用為45~75
// ratio 寬高比建議用物件的方式存值
// near/far 相機可以看多近/多遠
// 
//(field of view, ratio, near, far )
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3

// camera.lookAt() 可以避免歐拉角帶來的問題
// camera.lookAt(mesh.position)

scene.add(camera)

//將每個設計好的物件群組化 
// const group = new THREE.Group()
// group.scale.y = 2
// group.rotation.y = 0.2
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube1.position.x = - 1.5
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube2.position.x = 0
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube3.position.x = 1.5
// group.add(cube3)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

// 加入動畫測試

//three提供的時間方法
const clock = new THREE.Clock()
// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // 每一單位的時間差就加 0.01 的 位移y 以此做出動畫 類似"幀率 fps"
//     // mesh.rotation.y += 0.1 * elapsedTime
//     mesh.position.x = Math.cos(elapsedTime)
//     mesh.position.y = Math.sin(elapsedTime)
//     camera.lookAt(mesh.position)
//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

//也可以使用GSAP的方法去產生位移

// const tick = () =>
// {   
//   gsap.to(mesh.position, { duration: 10, delay: 1, x: "+= .1", y: 1 }) // "+= .1" 持續更新位移
//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

//依照情境使用，如果是要製作一個不停選轉的螺旋槳，可以使用Three提供的時間方法，如果只是要從a點位移到b點，便可以使用GSAP

// Cursor
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) =>
{
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)

  // console.log(cursor.x, cursor.y)
})

// const tick = () =>
// {
//     // ...

//     // Update camera
//     camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
//     camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
//     camera.position.y = cursor.y * 3
//     camera.lookAt(mesh.position)
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }

// tick()
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})