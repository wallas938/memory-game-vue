import { shallowMount } from '@vue/test-utils'
import Starter from '@/pages/Starter.vue'

describe('Starter.vue', () => {
  it('renders Starter component', () => {
    const wrapper = shallowMount(Starter);
    expect(wrapper.isVisible());
  })
})
