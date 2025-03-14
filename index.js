import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs-core";

let model;

async function computeSimilarity(sentence1, sentence2) {
	await tf.setBackend("webgl");
	await tf.ready();
	if (!model) {
		// Load the model
		console.time("Loading model");
		model = await use.load();
		console.timeEnd("Loading model");
	}

	console.time("Computing similarity");

	// Generate embeddings
	const sentences = [sentence1, sentence2];
	const embeddings = await model.embed(sentences);

	// Extract individual embeddings with tf.unstack
	const [emb1, emb2] = tf.unstack(embeddings, 0); // Should return two [512] tensors

	// Expand dimensions using tf.expandDims() instead of emb1.expandDims()
	const emb2d1 = tf.expandDims(emb1, 0); // Convert [512] to [1, 512]
	const emb2d2 = tf.expandDims(emb2, 0); // Convert [512] to [1, 512]

	// Compute cosine similarity
	const dotProduct = tf.matMul(emb2d1, emb2d2, false, true).dataSync()[0];
	const norm1 = tf.norm(emb2d1).dataSync()[0];
	const norm2 = tf.norm(emb2d2).dataSync()[0];
	const similarity = dotProduct / (norm1 * norm2);

	console.timeEnd("Computing similarity");

	return similarity.toFixed(2);
}

async function init() {
	// Add event listener for the "Check similarity" button
	document
		.getElementById("check-similarity-btn")
		.addEventListener("click", async () => {
			const button = document.getElementById("check-similarity-btn");
			const loadingSpinner = document.getElementById("loading-spinner");
			const sentence1 = document.querySelector(
				"textarea[placeholder=\"Sentence 1\"]"
			).value;
			const sentence2 = document.querySelector(
				"textarea[placeholder=\"Sentence 2\"]"
			).value;

			if (sentence1 && sentence2) {
				button.disabled = true;
				loadingSpinner.classList.remove("hidden");

				const similarity = await computeSimilarity(sentence1, sentence2);
				document.getElementById("similarity-value").innerText = similarity;

				button.disabled = false;
				loadingSpinner.classList.add("hidden");
			} else {
				alert("Please enter both sentences.");
			}
		});
}

init();
