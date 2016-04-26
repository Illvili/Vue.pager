<ul class="pagination">
    <li :class="{ disabled: 1 == current }" @click="pageClicked(current - 1)">
        <a href="javascript:;">上一页</a>
    </li>
    <li class="page-mobile">
        <a href="javascript:;">
            {{ current }}
            <select class="page-select" @change="pageSelected($event)" v-model="pageSelect" :value="current">
                <option v-for="n in pages" :value="n + 1">{{ n + 1 }}</option>
            </select>
        </a>
    </li>
    <li :class="{ disabled: pages == 0 || pages == current }" @click="pageClicked(current + 1)">
        <a href="javascript:;">下一页</a>
    </li>

    <template v-for="n in pageItems">
        <li class="page disabled ommited" v-if="'.[' == n || '.]' == n">
            <a href="javascript:;">&hellip;</a>
        </li>
        <li v-else class="page" :class="{ active: n == current }" @click="pageClicked(n)">
            <a href="javascript:;">{{ n }}</a>
        </li>
    </template>

    <li class="jumpInput" :class="{ 'has-error': '' != pageInput && (pageInput < 1 || pageInput > pages) }">
        <input class="form-control" :class="{ 'hasValue': !!pageInput }" type="number" v-model="pageInput" @keydown.13="gotoPage($event)" placeholder="跳转" @focus="pageInputGotFocus = true" @blur="pageInputGotFocus = false" min="1" :max="pages" v-if="pages">
    </li>
    <li class="jumpButton" @click="gotoPage()" v-show="!!pageInput || pageInputGotFocus" :class="{ disabled: '' != pageInput && (pageInput < 1 || pageInput > pages) }" transition>
        <a href="javascript:;">跳转</a>
    </li>
</ul>
