import { shallowMount } from '@vue/test-utils'
import Game from '@/pages/Game.vue'

describe('Starter.vue', () => {
  it('renders Starter component', () => {
    const wrapper = shallowMount(Game);

    expect(wrapper.isVisible());
  })
})
