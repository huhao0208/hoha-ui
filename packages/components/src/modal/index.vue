<template>
  <Teleport to="body">
    <Transition name="ho-modal">
      <div
        v-if="computedVisible"
        class="ho-modal"
        @click.self="handleMaskClick"
      >
        <div
          ref="modalRef"
          class="ho-modal__dialog"
          :style="dialogStyle"
          @mousedown="handleDragStart"
        >
          <!-- Header -->
          <div class="ho-modal__header">
            <span class="ho-modal__title">{{ title }}</span>
            <button
              v-if="closable"
              class="ho-modal__close"
              @click="handleClose"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
              >
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="ho-modal__body">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="ho-modal__footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'HoModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 520
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'update:visible', 'close', 'confirm'],
  setup(props, { emit }) {
    const computedVisible = computed(() => props.modelValue || props.visible)
    
    // Watch for external visible changes
    watch(() => props.modelValue, (val) => {
      emit('update:visible', val)
    })
    watch(() => props.visible, (val) => {
      emit('update:modelValue', val)
    })
    
    const modalRef = ref<HTMLElement | null>(null)
    const position = ref({ x: 0, y: 0 })
    const isDragging = ref(false)
    const dragStart = ref({ x: 0, y: 0 })

    const dialogStyle = computed<CSSProperties>(() => {
      const width = typeof props.width === 'number' ? `${props.width}px` : props.width
      const style: CSSProperties = { width }
      
      if (props.draggable && (position.value.x || position.value.y)) {
        style.transform = `translate(${position.value.x}px, ${position.value.y}px)`
      }
      
      return style
    })

    const handleMaskClick = () => {
      if (props.maskClosable) {
        handleClose()
      }
    }

    const handleClose = () => {
      emit('update:modelValue', false)
      emit('update:visible', false)
      emit('close')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    // ESC key support
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && computedVisible.value && props.closable) {
        handleClose()
      }
    }

    // Drag support
    const handleDragStart = (e: MouseEvent) => {
      if (!props.draggable) return
      
      // Only allow dragging from header
      const target = e.target as HTMLElement
      if (!target.closest('.ho-modal__header')) return
      
      isDragging.value = true
      dragStart.value = {
        x: e.clientX - position.value.x,
        y: e.clientY - position.value.y
      }
      
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
    }

    const handleDragMove = (e: MouseEvent) => {
      if (!isDragging.value) return
      
      position.value = {
        x: e.clientX - dragStart.value.x,
        y: e.clientY - dragStart.value.y
      }
    }

    const handleDragEnd = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
    }

    // Reset position when modal opens
    watch(() => computedVisible.value, (val) => {
      if (val) {
        position.value = { x: 0, y: 0 }
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden'
      } else {
        // Restore body scroll when modal is closed
        document.body.style.overflow = ''
      }
    })

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      // Ensure body scroll is restored when component is unmounted
      document.body.style.overflow = ''
    })

    return {
      modalRef,
      dialogStyle,
      computedVisible,
      handleMaskClick,
      handleClose,
      handleConfirm,
      handleDragStart
    }
  }
})
</script>

<style lang="less">
.ho-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;

  &__dialog {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    cursor: move;
    user-select: none;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: #9ca3af;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      background: #f3f4f6;
      color: #4b5563;
    }
  }

  &__body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  }

  &__footer {
    padding: 16px 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}

// Transitions
.ho-modal-enter-active,
.ho-modal-leave-active {
  transition: opacity 0.25s ease;

  .ho-modal__dialog {
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
}

.ho-modal-enter-from,
.ho-modal-leave-to {
  opacity: 0;

  .ho-modal__dialog {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
