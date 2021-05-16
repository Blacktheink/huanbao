<template>
    <div class="qy-input_init">
        <div v-if="type !== 'textarea'" class="qy-input_input">
            <input v-if="type !== 'textarea'"
                   class="qy-input_input__inner"
                   :type="type"
                   v-model="inputValue"
                   ref="input"
                   :placeholder="placeholder"
                   @input="handleInput"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   @change="handleChange"
            />
            <span class="qy-input_input__suffix">
                <slot name="suffix">

                </slot>
                <div style="display: inline-block" v-if="clearable && focused && value" @click="clearValue">
                    <svg  t="1618472954060" class="icon qy-input_clear" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5646" width="128" height="128">
                        <path d="M512 0C228.266667 0 0 228.266667 0 512s228.266667 512 512 512 512-228.266667 512-512-228.266667-512-512-512z" fill="#C0CCDA" p-id="5647"></path>
                        <path d="M725.333333 725.333333a34.816 34.816 0 0 1-51.2 0L512 563.2 349.866667 725.333333a34.816 34.816 0 0 1-51.2 0 34.816 34.816 0 0 1 0-51.2L460.8 512 298.666667 349.866667a34.816 34.816 0 0 1 0-51.2 34.816 34.816 0 0 1 51.2 0L512 460.8l162.133333-162.133333a34.816 34.816 0 0 1 51.2 0 34.816 34.816 0 0 1 0 51.2L563.2 512l162.133333 162.133333c19.2 14.933333 19.2 40.533333 0 51.2z" fill="#FFFFFF" p-id="5648"></path></svg>
                </div>
            </span>
        </div>

        <textarea
                v-else
                class="qy-input_textarea"
                ref="textarea"
                :placeholder="placeholder"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
        ></textarea>
    </div>
</template>

<script>
    export default {
        name: "qy-input",
        data(){
            return{
                focused:true,
            }
        },
        props: {
            //值
            value: {
                type:[String, Number],
            },
            //类型
            type: {
                type: String,
                default: 'text'
            },
            //占位符
            placeholder: {
                type: String,
                default: ''
            },
            //是否清除
            clearable: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            inputValue() {
                return this.value === null || this.value === undefined ? '' : String(this.value);
            },
        },
        beforeMount() {
            this.setValue();
        },
        methods: {
            setValue() {
                const _this = this;
                let input = _this.$refs.input || _this.$refs.textarea;
                if (!input) return;
                console.warn(input.value ,_this.inputValue,'*********setValue')
                if (input.value === _this.inputValue) return;
                input.value = _this.inputValue;
            },
            clearValue() {
                const _this = this;
                this.$emit('input', '');
                this.$emit('change', '');
                this.$emit('clear');
            },
            handleInput(event) {
                console.warn(event.target.value , this.inputValue,this.value+'----handleInput')
                if (event.target.value === this.inputValue) return;
                this.$emit('input', event.target.value);
                this.$nextTick(this.setValue);
            },
            handleFocus(event) {
                this.focused = true;
                this.$emit('focus', event);
            },
            handleChange(event) {
                this.$emit('change', event.target.value);
            },
            handleBlur(event) {
                // this.focused = false;
                this.$emit('blur', event);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme-color.scss";
    input,textarea {
        outline: none;
    }

    .qy-input_init {

        .qy-input_input{
            position: relative;
            /*width: fit-content;*/
            height: fit-content;
            .qy-input_input__inner{
                width: 100%;
                font-size: inherit;
                height: 40px;
                line-height: 40px;
                color: $textColor;
                padding: 0 15px;
                box-sizing: border-box;
                border-radius: 5px;
                border: 1px solid $borderColor;
                &:focus,&:active{
                    border-color: $focus-borderColor;
                }
            }
            .qy-input_input__suffix{
                position: absolute;
                right: 10px;
                top: 50%;
                width: fit-content;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translateY(-50%);

                .qy-input_clear{
                    width: 16px;
                    height: 100%;
                    path{
                        cursor: pointer;
                        &:first-child{
                            fill: $svg-color;
                        }
                        &:hover {
                            opacity: 0.7;
                        }
                    }
                }
            }
        }

        .qy-input_textarea{
            resize: none;
            width: 100% !important;
            line-height: 40px;
            color: $textColor;
            box-sizing: border-box;
            border-radius: 5px;
            padding: 0 15px;
            border: 1px solid $borderColor;
            &:focus,&:active{
                border-color: $focus-borderColor;
            }
        }
    }
</style>