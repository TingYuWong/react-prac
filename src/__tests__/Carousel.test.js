/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals'
import { render } from '@testing-library/react'

import Carousel from '../Carousel'

test('users click on thumbnail and change the hero image', async () => {
    const images = ['1.jpg', '2.jpg', '3.jpg']
    const carousel = render(<Carousel images={images}/>)
    const hero = await carousel.findByTestId('hero')
    for(let i = 0; i < images.length; i++) {
        let thumb = await carousel.findByTestId(`thumbnails${i}`)
        thumb.click()

        expect(hero.src).toContain(images[i])
        expect(thumb.classList).toContain('active')
    }
})



