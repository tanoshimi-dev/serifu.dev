<template>
  <div class="bg-white px-6 py-2 lg:px-8">
    <div class="mx-auto max-w-3xl text-base/7 text-gray-700">
      <!-- <p class="text-base/7 font-semibold text-indigo-600">Introducing</p> -->
      <h1 class="mt-2 text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">セリフを使ってつぶやこう！</h1>
      <div class="mt-10 max-w-2xl">
        <fieldset>
          <legend class="text-sm/6 font-semibold text-gray-900">ジャンル</legend>
          <div class="mt-2 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            <div v-for="notificationMethod in notificationMethods" :key="notificationMethod.id" class="flex items-center">
              <input :id="notificationMethod.id" name="notification-method" type="radio" :checked="notificationMethod.id === 'email'" class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden" />
              <label :for="notificationMethod.id" class="ml-3 block text-sm/6 font-medium text-gray-900">{{ notificationMethod.title }}</label>
            </div>
          </div>
        </fieldset>
        <!-- <h5 class="mt-4 text-pretty text-2xl tracking-tight text-gray-900">美味しんぼ</h5> -->
        <Combobox as="div" v-model="selectedPerson" @update:modelValue="query = ''">
          <ComboboxLabel class="mt-4 block text-sm/6 font-medium text-gray-900">作品</ComboboxLabel>
          <div class="relative mt-2">
            <ComboboxInput class="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" @change="query = $event.target.value" @blur="query = ''" :display-value="(person) => person?.name" />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="filteredPeople.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
                <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white outline-none' : 'text-gray-900']">
                  <span :class="['block truncate', selected && 'font-semibold']">
                    {{ person.name }}
                  </span>

                  <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
                    <CheckIcon class="size-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        </Combobox>

        <Combobox as="div" v-model="selectedPerson" @update:modelValue="query = ''">
          <ComboboxLabel class="mt-4 block text-sm/6 font-medium text-gray-900">セリフ</ComboboxLabel>
          <div class="relative mt-2">
            <ComboboxInput class="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" @change="query = $event.target.value" @blur="query = ''" :display-value="(person) => person?.name" />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="filteredPeople.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person" as="template" v-slot="{ active, selected }">
                <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white outline-none' : 'text-gray-900']">
                  <span :class="['block truncate', selected && 'font-semibold']">
                    {{ person.name }}
                  </span>

                  <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
                    <CheckIcon class="size-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        </Combobox>        

        <!-- <p class="mt-4 font-bold ">料理は心だ！</p> -->
        <figure class="mt-6 border-l border-indigo-600 pl-4">
          <blockquote class="text-gray-900 text-sm">
            <p>士郎が素朴な家庭料理の味に感動した時に言ったセリフ。高級料理よりも、料理に込められた愛情や心遣いこそが本質だと気付く重要な場面で、作品のテーマを象徴する言葉です。</p>
          </blockquote>
        </figure>
      </div>


      <div class="mt-6 col-span-full">
        <label for="about" class="block text-sm/6 font-medium text-gray-900">つぶやき</label>
        <div class="mt-2">
          <textarea name="about" id="about" rows="3" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
        <p class="mt-3 text-sm/6 text-gray-600">選択したセリフを1回以上使って下さい</p>
      </div>

      <div class="mt-2 col-span-full text-center">
        <button type="button" class="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">つぶやく</button>
      </div>



      <!-- <div class="mt-6 max-w-2xl">
        <h2 class="text-pretty text-3xl font-semibold tracking-tight text-gray-900">Everything you need to get up and running</h2>
        <p class="mt-6">Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.</p>
        <p class="mt-8">Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
      </div> -->

    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'
const notificationMethods = [
  { id: 'manga', title: 'マンガ' },
  { id: 'drama', title: 'ドラマ' },
]

import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Leslie Alexander' },
  // More users...
]

const query = ref('')
const selectedPerson = ref(null)
const filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase())
      }),
)

</script>