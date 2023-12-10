import { Skia, Canvas, useCanvasRef, Circle, useValue, Drawing } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions } from 'react-native'
import { XStack } from 'tamagui'
import { View, Text, Button } from 'react-native'
import { GestureHandler } from './GestureHandler'

const paint = Skia.Paint()
paint.setAntiAlias(true)

export default function HelloWorld () {
  const ref = useCanvasRef()
  const { width, height } = Dimensions.get('window')
  let posx = useValue(0) // mousex
  let posy = useValue(0) // mousey
  let pposx = useValue(0) // previous mousex
  let pposy = useValue(0) // previous mousey
  let mouseIsPressed = useValue(false)
  let clickedOnCanvas = false
  let select_anything = false
  let origin_x = useValue(width / 2)
  let origin_y = useValue(height / 2)
  const ncolor = useValue('#222138')
  const ncolor1 = useValue('#48465F')
  const fontSize = 32
  // const font = useFont(require("app/assets/fonts/OpenSansRegular.ttf"), fontSize);

  const GroupOrientations: any = [{ group_id: '1', orientation: 0 }]

  const listOfNodes: any = [
    {
      id: '1',
      group_id: '1',
      cx: useValue(0),
      cy: useValue(0),
      x: useValue(0 + origin_x.current),
      y: useValue(0 + origin_y.current),
      r: 35,
      rotation: 0,
      label: 'k1',
      is_hovered: useValue(false),
      is_dragged: false,
      is_selected: false,
      parent: '',
      childs: ['2', '3'],
    },
    {
      id: '2',
      group_id: '1',
      cx: useValue(200),
      cy: useValue(200),
      x: useValue(200 + origin_x.current),
      y: useValue(200 + origin_y.current),
      r: 35,
      rotation: 0,
      label: 'k2',
      is_hovered: useValue(false),
      is_dragged: false,
      is_selected: false,
      parent: '1',
      childs: [],
    },
    {
      id: '3',
      group_id: '1',
      cx: useValue(-200),
      cy: useValue(200),
      x: useValue(-200 + origin_x.current),
      y: useValue(200 + origin_y.current),
      r: 35,
      rotation: 0,
      label: 'k3',
      is_hovered: useValue(false),
      is_dragged: false,
      is_selected: false,
      parent: '1',
      childs: [],
    },
    {
      id: '4',
      group_id: '1',
      cx: useValue(-100),
      cy: useValue(200),
      x: useValue(-100 + origin_x.current),
      y: useValue(200 + origin_y.current),
      r: 35,
      rotation: 0,
      label: 'k4',
      is_hovered: useValue(false),
      is_dragged: false,
      is_selected: false,
      parent: '1',
      childs: [],
    },
  ]

  const checkIfMouseOverlapsWithAnyNode = () => {

    let stack_flag: any = false
    let all_concenred_indxs: any = []

    for (let i = 0; i < listOfNodes.length; i++) {
      if (
        posx.current >= listOfNodes[i].x.current - listOfNodes[i].r &&
        posx.current <= listOfNodes[i].x.current + listOfNodes[i].r &&
        posy.current >= listOfNodes[i].y.current - listOfNodes[i].r &&
        posy.current <= listOfNodes[i].y.current + listOfNodes[i].r
      ) {
        listOfNodes[i].is_hovered.current = true
        all_concenred_indxs.push(i)
        stack_flag = true
        // if (mouseIsPressed.current) {
        //   console.log('is drag')
        //   clickedOnCanvas = false
        //   listOfNodes[i].is_hovered.current = true
        //   listOfNodes[i].is_dragged = true
        //   listOfNodes[i].is_selected = true
        //   break;
        // }
      } else {
        listOfNodes[i].is_hovered.current = false
      }

      
    let top_comp_indx = -1

    if (stack_flag) {
      for (let ki = all_concenred_indxs.length - 1; ki > -1; ki--) {
        let node_radius = listOfNodes[all_concenred_indxs[ki]].r

        let topleft_x =
          listOfNodes[all_concenred_indxs[ki]].cx.current + origin_x.current - node_radius

        let topleft_y =
          listOfNodes[all_concenred_indxs[ki]].cy.current + origin_y.current - node_radius

        let topleft_offset_x = listOfNodes[all_concenred_indxs[ki]].r * 2
        let topleft_offset_y = listOfNodes[all_concenred_indxs[ki]].r * 2

        if (
          posx.current >= topleft_x &&
          posy.current >= topleft_y &&
          posx.current <= topleft_x + topleft_offset_x &&
          posy.current <= topleft_y + topleft_offset_y
        ) {
          listOfNodes[all_concenred_indxs[ki]].is_hovered.current = true
          top_comp_indx = all_concenred_indxs[ki]
          break
        }
      }
    }

    for (let ki = 0; ki < all_concenred_indxs.length; ki++) {
      if (all_concenred_indxs[ki] !== top_comp_indx) {
        listOfNodes[all_concenred_indxs[ki]].is_hovered.current = false
        listOfNodes[all_concenred_indxs[ki]].is_dragged = false
      }
    }

    if (mouseIsPressed.current && top_comp_indx !== -1) {
      select_anything = true
      listOfNodes[top_comp_indx].is_selected = true
      listOfNodes[top_comp_indx].is_dragged = true
    }

    }
  }

  const checkIfNodeDrag = () => {
    let any_dragged = false
    for (let i = 0; i < listOfNodes.length; i++) {
      if (listOfNodes[i].is_dragged) {
        any_dragged = true
        listOfNodes[i].cx.current = posx.current - origin_x.current
        listOfNodes[i].cy.current = posy.current - origin_y.current
      }
    }
    return any_dragged
  }

  const handlemousedown = (x, y) => {}

  const mouseUp = () => {
    for (let i = 0; i < listOfNodes.length; i++) {
      listOfNodes[i].is_dragged = false
    }
    select_anything = false
    mouseIsPressed.current = false
    clickedOnCanvas = false
  }

  const mouseMove = (x, y) => {
    mouseIsPressed.current = true
    const speed = 0.9
    pposx.current = posx.current
    pposy.current = posy.current
    posx.current = posx.current + (x - posx.current) * speed
    posy.current = posy.current + (y - posy.current) * speed

    let any_dragged = checkIfNodeDrag()

    if (!any_dragged) {
      if (clickedOnCanvas) {
        origin_x.current = posx.current + (origin_x.current - pposx.current)

        origin_y.current = posy.current + (origin_y.current - pposy.current)
      }
    }
  }

  const draw = (canvas, paint) => {
    checkIfMouseOverlapsWithAnyNode()
    checkIfNodeDrag()

    if (!select_anything && mouseIsPressed.current) {
      clickedOnCanvas = true
    }

    for (let i = 0; i < listOfNodes.length; i++) {
      listOfNodes[i].x.current = listOfNodes[i].cx.current + origin_x.current
      listOfNodes[i].y.current = listOfNodes[i].cy.current + origin_y.current
    }

    for (let i = 0; i < listOfNodes.length; i++) {
      const cyan = Skia.Paint()
      cyan.setColor(Skia.Color('white'))

      let filterChilds = listOfNodes.filter((f) => listOfNodes[i].id === f.parent)

      let v1_x = listOfNodes[i].cx.current + origin_x.current
      let v1_y = listOfNodes[i].cy.current + origin_y.current + listOfNodes[i].r

      if (listOfNodes[i].rotation === 90) {
        //left
        v1_x = listOfNodes[i].cx.current + origin_x.current - listOfNodes[i].r
        v1_y = listOfNodes[i].cy.current + origin_y.current
      } else if (listOfNodes[i].rotation === 180) {
        //top
        v1_x = listOfNodes[i].cx.current + origin_x.current
        v1_y = listOfNodes[i].cy.current + origin_y.current - listOfNodes[i].r
      } else if (listOfNodes[i].rotation === 270) {
        //right
        v1_x = listOfNodes[i].cx.current + origin_x.current + listOfNodes[i].r
        v1_y = listOfNodes[i].cy.current + origin_y.current
      } else if (listOfNodes[i].rotation === 360) {
        //bottom
        v1_x = listOfNodes[i].cx.current + origin_x.current
        v1_y = listOfNodes[i].cy.current + origin_y.current + listOfNodes[i].r
      }

      for (let j = 0; j < filterChilds.length; j++) {
        let v2_x = filterChilds[j].cx.current + origin_x.current
        let v2_y = filterChilds[j].cy.current + origin_y.current - filterChilds[j].r

        if (filterChilds[j].rotation === 270) {
          //left
          v2_x = filterChilds[j].cx.current + origin_x.current - filterChilds[j].r
          v2_y = filterChilds[j].cy.current + origin_y.current
        } else if (filterChilds[j].rotation === 360) {
          //top
          v2_x = filterChilds[j].cx.current + origin_x.current
          v2_y = filterChilds[j].cy.current + origin_y.current - filterChilds[j].r
        } else if (filterChilds[j].rotation === 90) {
          //right
          v2_x = filterChilds[j].cx.current + origin_x.current + filterChilds[j].r
          v2_y = filterChilds[j].cy.current + origin_y.current
        } else if (filterChilds[j].rotation === 180) {
          //bottom
          v2_x = filterChilds[j].cx.current + origin_x.current
          v2_y = filterChilds[j].cy.current + origin_y.current + filterChilds[j].r
        }

        canvas.drawLine(v1_x, v1_y, v2_x, v2_y, cyan)
      }
    }
  }

  const onRotate = () => {
    let concerned_group = ''
    for (let i = 0; i < listOfNodes.length; i++) {
      if (listOfNodes[i].is_selected) {
        concerned_group = listOfNodes[i].group_id
        break
      }
    }

    if (concerned_group !== '') {
      let group = GroupOrientations.filter((g) => g.group_id === concerned_group)
      if (group[0].orientation + 90 > 360) {
        group[0].orientation = 0
      } else {
        group[0].orientation = 90
      }

      let filtergroupnodes = listOfNodes.filter((n) => concerned_group === n.group_id)
      let leftmostx = 9999999
      let rightmostx = -9999999
      let topmmosty = 9999999
      let bottommosty = -9999999
      for (let i = 0; i < filtergroupnodes.length; i++) {
        if (filtergroupnodes[i].cx.current < leftmostx) leftmostx = filtergroupnodes[i].cx.current
        if (filtergroupnodes[i].cx.current > rightmostx) rightmostx = filtergroupnodes[i].cx.current

        if (filtergroupnodes[i].cy.current < topmmosty) topmmosty = filtergroupnodes[i].cy.current
        if (filtergroupnodes[i].cy.current > bottommosty)
          bottommosty = filtergroupnodes[i].cy.current
      }

      let centergroupx = (leftmostx + rightmostx) / 2
      let centergroupy = (topmmosty + bottommosty) / 2

      //const new_x = Cx + (old_x - Cx) * Math.cos(theta) - (old_y - Cy) * Math.sin(theta);
      //const new_y = Cy + (old_x - Cx) * Math.sin(theta) + (old_y - Cy) * Math.cos(theta);

      for (let i = 0; i < filtergroupnodes.length; i++) {
        let theta = group[0].orientation * (Math.PI / 180)

        filtergroupnodes[i].rotation += 90
        if (filtergroupnodes[i].rotation >= 360) {
          filtergroupnodes[i].rotation -= 360
        }

        let rel_x = filtergroupnodes[i].cx.current - centergroupx
        let rel_y = filtergroupnodes[i].cy.current - centergroupy

        let new_rel_x = rel_x * Math.cos(theta) - rel_y * Math.sin(theta)
        let new_rel_y = rel_x * Math.sin(theta) + rel_y * Math.cos(theta)

        let new_cx = new_rel_x + centergroupx
        let new_cy = new_rel_y + centergroupy

        filtergroupnodes[i].cx.current = new_cx
        filtergroupnodes[i].cy.current = new_cy

        for (let i = 0; i < listOfNodes.length; i++) {
          listOfNodes[i].x.current = listOfNodes[i].cx.current + origin_x.current
          listOfNodes[i].y.current = listOfNodes[i].cy.current + origin_y.current
        }
      }
    }
  }

  const locationMatrix = useValue(Skia.Matrix())

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 0,
        }}
      >
        <View style={{ backgroundColor: 'white', width: '80%', height: height }}>
          <GestureHandler
            matrix={locationMatrix}
            width={width}
            height={height}
            handlemousemove={mouseMove}
            handleclick={mouseUp}
            handlemousedown={handlemousedown}
          >
            <Canvas style={{ flex: 1, backgroundColor: '#5F5D72' }} ref={ref} mode='continuous'>
              {listOfNodes.map((n, index) => {
                return (
                  <Circle
                    key={index}
                    r={n.r}
                    cx={n.x}
                    cy={n.y}
                    color={n.is_hovered.current ? ncolor1.current : ncolor.current}
                  />
                )
              })}
              <Drawing
                drawing={({ canvas, paint }) => {
                  draw(canvas, paint)
                }}
              />
            </Canvas>
          </GestureHandler>
        </View>
        <View style={{ backgroundColor: '#222138', width: '20%', height: height }}>
          <XStack>
            <Text style={{ color: 'white', fontWeight: 'bold', margin: '10%' }}>
              Control Panel
            </Text>
          </XStack>
          <XStack style={{ margin: '10%' }}>
            <Button onPress={onRotate} title='Rotate 90' color='#841584' />
          </XStack>
        </View>
      </View>
    </>
  )
}
