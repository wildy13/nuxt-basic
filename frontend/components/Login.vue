<template>
  <div
    class="grid justify-center items-center lg:block w-full h-screen bg-slate-200"
  >
    <div class="text-xs lg:p-5 lg:px-52 text-right md:text-base">
      <div class="lg:flex justify-around">
        <div class="hidden lg:block">
          <img src="~/assets/img/logo.png" class="w-1/3" />
        </div>
        <div class="w-full">
          <div>Contact Us (+62)812 3456 7890</div>
          <div>example@gmail.com</div>
        </div>
      </div>
    </div>

    <div class="2xl:px-96 grid lg:h-4/5">
      <transition name="slide-in">
        <div
          v-if="showForm"
          class="lg:grid grid-cols-2 gap-2 justify-center items-center lg:bg-slate-100 drop-shadow-2xl p-5 rounded-lg lg:h-full"
        >
          <!-- image -->
          <div
            class="hidden lg:grid border-r-2 border-slate-600 lg:justify-items-center"
          >
            <img
              src="~/assets/img/favicon.png"
              class="w-3/5"
              alt="Sample image"
            />
            <div>
              <div class="font-bold text-center text-lg">
                Streams Admin Dashboard Key Features Include :
              </div>
              <div class="text-justify">
                <ol class="list-decimal">
                  <li>Broweser-based user and account level administration</li>
                  <li>Single login admin for all communication service</li>
                  <li>Manage all user from anywhere in the world</li>
                  <li>Customize features for each user at any time</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- form -->
          <div>
            <transition name="fade">
              <div
                v-show="showForm"
                class="w-full h-full text-center text-white bg-green-500 rounded-md p-5 sm:w-[384px] lg:h-2/4 lg:w-full"
              >
                <!--                 <el-transition name="login"> -->
                <div
                  class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
                >
                  <p
                    class="mx-4 mb-0 text-center font-semibold dark:text-white"
                  >
                    Login
                  </p>
                </div>
                <!--                 </el-transition> -->
                <div class="mt-10">
                  <el-form
                    ref="form"
                    :model="form"
                    :rules="rules"
                    :hide-required-asterisk="true"
                    label-position="top"
                    @submit.native.prevent="submitForm('form')"
                  >
                    <div>
                      <!-- Email input -->
                      <el-form-item>
                        <el-input
                          v-model="form.username"
                          type="text"
                          placeholder="Username"
                        />
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item>
                        <!-- Password input -->
                        <el-input
                          v-model="form.password"
                          type="password"
                          placeholder="Password"
                          show-password
                        />
                      </el-form-item>
                    </div>
                    <div>
                      <!-- Sign in Button -->
                      <el-button
                        class="primary text-slate-200"
                        :loading="loading"
                        type="submit"
                        native-type="submit"
                        plain
                      >
                        Sign-in
                      </el-button>
                    </div>
                  </el-form>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>

    <div class="grid justify-center items-end text-xs md:text-base">
      <div>
        &copy; 2023 Agraindo Jaya Sena, All right reserved. | Privacy Policy
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
      error: '',
      loading: false,
      showForm: false,
    }
  },

  mounted() {
    // Use a timeout to start the animation after a short delay
    setTimeout(() => {
      this.showForm = true
    }, 200)
  },

  methods: {
    submitForm(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            await this.$auth.loginWith('local', { data: this.form })
          } catch (err) {
            this.error = err.response.data
            this.$notify.error({
              title: 'Error',
              message: this.error,
            })
            this.loading = false
          }
        }
      })
    },

    async animateForm() {
      await this.$nextTick()
      this.showForm = true
    },
  },
}
</script>

<style>
/* Define the 'fade' transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Define the 'slide-in' transition */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s;
}

.slide-in-enter {
  transform: translateX(-100%);
}

.slide-in-leave-to /* .slide-in-leave-active in <2.1.8 */ {
  transform: translateX(-100%);
}
</style>
