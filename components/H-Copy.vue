<template>
  <div @click="copy">
    <input
      ref="clone"
      v-on:focus="$event.target.select()"
      readonly
      :value="text"
      class="clone"
    />
    <svg
      v-if="hideIcon == false"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13.8462C1 15.9138 1.11209 17.507 1.38686 18.7433C1.65911 19.9683 2.07757 20.7808 2.64841 21.3516C3.21924 21.9224 4.03171 22.3409 5.25671 22.6131C6.49306 22.8879 8.08631 23 10.1539 23C12.2215 23 13.8148 22.8879 15.0511 22.6131C16.2761 22.3409 17.0886 21.9224 17.6594 21.3516C18.2303 20.7808 18.6487 19.9683 18.921 18.7433C19.1958 17.507 19.3079 15.9138 19.3079 13.8462C19.3079 11.7786 19.1958 10.1853 18.921 8.94898C18.6487 7.72399 18.2303 6.91154 17.6594 6.34071C17.0886 5.76988 16.2761 5.35141 15.0511 5.07917C13.8148 4.8044 12.2215 4.69231 10.1539 4.69231C8.08631 4.69231 6.49306 4.8044 5.25671 5.07917C4.03171 5.35141 3.21924 5.76988 2.64841 6.34071C2.07757 6.91154 1.65911 7.72399 1.38686 8.94898C1.11209 10.1853 1 11.7786 1 13.8462Z"
        :stroke="hashColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.2727 15.6857C20.2384 16.5026 20.1776 17.2432 20.0835 17.9142C23.1962 16.9629 24 14.5701 24 9.23077C24 1.84615 22.1538 0 14.7692 0C9.42983 0 7.03702 0.8038 6.08569 3.91643C6.75663 3.82242 7.49727 3.76155 8.31412 3.72731C8.44135 3.49482 8.57755 3.31883 8.71735 3.17903C9.04451 2.85187 9.56988 2.54438 10.5538 2.32571C11.5605 2.10199 12.9144 2 14.7692 2C18.4758 2 19.991 2.51177 20.7396 3.26037C21.4882 4.00897 22 5.52417 22 9.23077C22 11.0855 21.898 12.4394 21.6743 13.4461C21.4556 14.43 21.1481 14.9554 20.821 15.2825C20.6812 15.4223 20.5052 15.5585 20.2727 15.6857Z"
        :fill="hashColor"
      ></path>
    </svg>
    <slot />
  </div>
</template>

<script const setup>
import { AlertType } from "~~/models/utilities/AlertType";

const props = defineProps({
  hashColor: {
    type: String,
    default: "#212135",
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
  text: {
    type: String,
    default: "",
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
});
const clone = ref(null);
const toast = useToast();

const copy = () => {
  clone.value.focus();
  document.execCommand("copy");
  toast.showToast("متن کپی شد", AlertType.Success);
};

function copyToClipboard(elem) {
  // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
    // can just use the original source element for the selection and copy
    target = elem;
    origSelectionStart = elem.selectionStart;
    origSelectionEnd = elem.selectionEnd;
  } else {
    // must use a temporary form element for the selection and copy
    target = document.getElementById(targetId);
    if (!target) {
      var target = document.createElement("textarea");
      target.style.position = "fixed";
      target.style.left = "-9999px";
      target.style.opacity = "0";
      target.style.top = "0";
      target.id = targetId;
      document.body.appendChild(target);
    }
    target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);

  // copy the selection
  var succeed;
  try {
    succeed = document.execCommand("copy");
  } catch (e) {
    succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  if (isInput) {
    // restore prior selection
    elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
    // clear temporary content
    target.textContent = "";
  }
  return succeed;
}
</script>

<style >
.clone {
  opacity: 0;
  position: fixed;
  top: -100%;
  left: 200%;
}
</style>