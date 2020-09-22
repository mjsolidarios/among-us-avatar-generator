import React, { useState, useRef, forwardRef } from 'react';
import { SketchPicker, SliderPicker } from 'react-color';
import { exportComponentAsPNG } from "react-component-export-image";
import { AmongUs } from '../assets';
import { Head } from 'react-static'

const AvatarComponent = forwardRef((props: any, ref:any) => (<div ref={ref}><AmongUs {...props} /></div>));

export default () => {
  const [background, setBackground] = useState('#fff');
  const avatarRef = useRef();

  return (
    <div className="text-center mx-auto max-w-sm p-8 text-white">
      <Head>
        <title>Among Us Avatar Generator</title>
      </Head>
      <h1 className="text-lg font-bold">Among Us Avatar Generator</h1>
      <AvatarComponent ref={avatarRef} className="mx-auto max-w-xs max-h-full" height={300} width={300} background={background} />
      <SketchPicker
        className="mx-auto"
        presetColors={[
          '#F44336',
          '#E91E63',
          '#9C27B0',
          '#673AB7',
          '#3F51B5',
          '#2196F3',
          '#03A9F4',
          '#00BCD4',
          '#009688',
          '#4CAF50',
          '#8BC34A',
          '#CDDC39',
          '#FFEB3B',
          '#FFC107',
          '#FF9800',
          '#FF5722',
          '#795548',
          '#9E9E9E',
          '#607D8B',
        ]}
        disableAlpha={true}
        color={background}
        onChangeComplete={color => setBackground(color.hex)}
      />
      <SliderPicker
        className="mt-8 mx-auto"
        color={background}
        onChangeComplete={color => setBackground(color.hex)}
      />
      <div className="flex place-items-center">
      <AmongUs height={50} width={50} background={background} />
      <button onClick={() => exportComponentAsPNG(avatarRef)} className="ml-4 py-3 w-full my-8 bg-white rounded-full text-gray-800">Download Your Avatar</button>
      </div>

      <small>Made for my students | <a className="text-blue-500" href="http://">Learn More</a></small>
    </div>
  )
}
