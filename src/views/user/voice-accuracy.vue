<!--
 * @Author: Rock Chang
 * @Date: 2023-03-17 16:37:33
 * @LastEditTime: 2023-03-17 18:09:03
 * @Description: 语音识别准确率 - 暂时
-->
<template>
	<div class="voice-accuracy">
		<h2>语音识别准确率</h2>
		<el-input
			v-model="originVal"
			:rows="4"
			type="textarea"
			placeholder="原始值"
		/>
		<br />
		<el-input
			v-model="nowVal"
			:rows="4"
			type="textarea"
			placeholder="语音识别后的值"
		/>
		<br />
		<el-switch v-model="hasPunctuate" />只对比中英文数字
		<el-button @click="onContrast">对比</el-button>
		准确率为 {{ accuracy }} %
	</div>
</template>

<script lang="ts" setup name="voice-accuracy">
import { ref } from 'vue';
const originVal = ref(''); // 原始值
const nowVal = ref(''); // 识别后的值
const accuracy = ref('0'); // 准确率
const hasPunctuate = ref(true); // 是否去除标点

const onContrast = () => {
	function forMat(s: string): string {
		return s.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g, '');
	}
	function computeAccuracy(reference, hypothesis) {
		// 将参考文本和识别结果分别转换成句子列表
		const referenceSentences = reference.trim().split('\n');
		const hypothesisSentences = hypothesis.trim().split('\n');
		let totalScore = 0;
		let totalWords = 0;

		// 对每个句子计算BLEU分数
		for (let i = 0; i < referenceSentences.length; i++) {
			let referenceSentence = referenceSentences[i];
			let hypothesisSentence = hypothesisSentences[i];
			if (hasPunctuate.value) {
				referenceSentence = forMat(referenceSentence);
				hypothesisSentence = forMat(hypothesisSentence);
			}
			referenceSentence = referenceSentence.split('');
			hypothesisSentence = hypothesisSentence.split('');

			// 对于BLEU指标，n-gram参数的选择通常是1、2、3或4
			const bleuScore = nBleu(referenceSentence, hypothesisSentence, 1);

			totalScore += bleuScore;
			totalWords += referenceSentence.length;
		}

		// 计算平均BLEU分数和识别准确率
		const averageScore = totalScore / referenceSentences.length;
		const accuracy = (averageScore * 100).toFixed(2);

		return {
			averageScore,
			accuracy,
		};
	}

	// 从参考文本和识别结果中提取n-gram
	function getNgrams(sentence, n) {
		const ngrams = new Map();
		const words = sentence;

		for (let i = 0; i < words.length - n + 1; i++) {
			const ngram = words.slice(i, i + n).join(' ');
			const count = ngrams.has(ngram) ? ngrams.get(ngram) + 1 : 1;
			ngrams.set(ngram, count);
		}

		return ngrams;
	}

	// 计算BLEU分数
	function nBleu(reference, hypothesis, n) {
		const referenceNgrams = getNgrams(reference, n);
		const hypothesisNgrams = getNgrams(hypothesis, n);

		let matchedNgrams = 0;

		for (const [ngram, count] of hypothesisNgrams) {
			if (referenceNgrams.has(ngram)) {
				const referenceCount = referenceNgrams.get(ngram);
				matchedNgrams += Math.min(count, referenceCount);
			}
		}

		const hypothesisLength = hypothesis.length;
		const referenceLength = reference.length;
		const brevityPenalty =
			hypothesisLength < referenceLength
				? Math.exp(1 - referenceLength / hypothesisLength)
				: 1;

		const precision = matchedNgrams / hypothesisLength;
		const bleu = brevityPenalty * Math.exp(Math.log(precision) / n);

		return bleu;
	}

	accuracy.value = computeAccuracy(nowVal.value, originVal.value).accuracy;
};
</script>

<style lang="less">
.voice-accuracy {
	padding: 20px;
	.el-textarea {
		padding: 10px 0;
	}
}
</style>
