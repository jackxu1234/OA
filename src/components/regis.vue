<template>
	<div class="login_container" :style="background">
		<div class="login_title">
			<h1>企业OA办公管理系统</h1>
		</div>
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="toplook_box">
				<img src="../assets/me.png" alt="" />
			</div>
			<!-- 登录表单区域 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" @keyup.enter.native="login"
						placeholder="请输入你的用户名"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"
						@keyup.enter.native="regis" placeholder="请输入用户密码" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="loginForm.re_password" prefix-icon="el-icon-lock" type="password"
						@keyup.enter.native="regis" placeholder="请再次输入用户密码" show-password></el-input>
				</el-form-item>
				<!-- 选择用户类型：管理员，用户 -->
				<el-form-item class="selectUser">
					<el-select v-model="value" placeholder="选择注册用户类型">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 按钮区域 -->
				<el-form-item class="btns">
					<el-button type="primary" style="width: 100px;" @click="regis">注册</el-button>
					<el-button type="primary" style="width: 100px;" @click="login">返回登录</el-button>
					<!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 登录用户类型
				options: [{
						value: '0',
						label: '普通用户'
					},
					{
						value: '1',
						label: '管理员'
					},
				],
				value: '',
				loginForm: {
					username: '',
					password: '',
					re_password: '',
					userId: '',
					permission:this.value,
				},
				background: {
					// 背景图片地址
					backgroundImage: 'url(' + require('../assets/bg.jpg') + ')',
					// 背景图片是否重复
					backgroundRepeat: 'no-repeat',
					// 背景图片大小
					backgroundSize: 'cover',
					// 背景颜色
					backgroundColor: '#000',
					// 背景图片位置
					backgroundPosition: 'center top',
				},
				//表单验证规则对象
				loginFormRules: {
					username: [{
							required: true,
							message: '请输入您的用户名',
							trigger: 'blur',
						},
						{
							min: 3,
							max: 8,
							message: '长度在 3 到 8 个字符',
							trigger: 'blur',
						},
					],
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur',
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur',
						},
					],
					repassword: [{
							required: true,
							message: '请再次输入登录密码',
							trigger: 'blur',
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur',
						},
					],
				},
			}
		},
		// created() {
		// 	this.changeUserId()
		// },
		methods: {
			//随机生成userId
			// changeUserId(){
			// 	const uId = Math.floor(Math.random()*15);
			// 	this.loginForm.userId = uId;
			// 	// console.log(uId);
			// },
			//点击重置按钮，重置注册表单
			resetLoginForm() {
				console.log(this)
				this.$refs.loginFormRef.resetFields()
			},
			login() {
				this.$router.push('/login')
			},
			regis() {
				this.$refs.loginFormRef.validate(async (valid) => {
					if (!valid) return
					if (this.loginForm.password == this.loginForm.re_password) {
						let data = {
							username: this.loginForm.username,
							password: this.loginForm.password,
							userId: this.loginForm.userId,
							permisson: this.loginForm.permission
						}
						console.log(data)
						let res = await this.$http.post(
							'/oa/Info/reg',
							data
						).then((result) => {
							console.log(result);
							if (result.data !== 'success') return this.$message.error('注册失败')
							this.$message({
								message: '注册成功',
								type: 'success',
								duration: 2000,
							})
							this.$router.push('/login')
						})
					} else {
						this.$message.error('两次密码不一致')
					}
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_title h1 {
		position: absolute;
		top: 20%;
		left: 25%;
		transform: translate(-50%, -50%);
		color: #52565b;
		font-size: 52px;
		font-weight: bold;
	}

	.login_box {
		border: 1px #605c3c solid;
		width: 400px;
		height: 350px;
		background-color: #fff;
		border-radius: 15px;
		position: absolute;
		left: 72%;
		top: 48%;
		transform: translate(-50%, -50%);

		.toplook_box {
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}

	.login_form {
		position: absolute;
		bottom: 0px;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.btns {
		text-align: center;
		justify-content: flex-end;
	}

	.login_container {
		width: 100%;
		height: 150;
	}
</style>
