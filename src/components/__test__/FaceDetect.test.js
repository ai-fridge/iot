// // /* global shallow */
// import { shallowComponent } from '../../test/helpers';
// import React from 'react';
// import FaceDetect from '../FaceDetect';

// const setup = () => {
//   const component = shallowComponent(FaceDetect);

//   return {
//     component: component,
//   }
// }

// describe('FaceDetect Component', () => {
//   let component;

//   beforeEach(() => {
//     component = setup().component;
//   });

//   afterEach(() => {
//     component.unmount();
//   });

//   it('find a face detect region', () => {
//     expect(component.find('div').length).toEqual(1);
//   });

// //   it('has a detection box', () => {
// //     expect(component.find("input[name='detect']")).toHaveLength(1);
// //   });
// });
