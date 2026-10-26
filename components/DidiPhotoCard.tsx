"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Heart, Sparkles, Upload, RotateCcw } from "lucide-react";

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/a-little-miracle" : "");
const defaultPhoto = `${basePath}/couple.jpg?v=2`;
const fallbackPhoto = `${basePath}/rani-didi.jpg?v=2`;
const placeholderPhoto = `${basePath}/rani-didi-placeholder.svg`;

export default function DidiPhotoCard() {
  const [photoUrl, setPhotoUrl] = useState<string>(defaultPhoto);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check localStorage for saved custom photo (only accept data URLs)
    try {
      const saved = localStorage.getItem("couple_photo");
      if (saved && saved.startsWith("data:")) {
        setPhotoUrl(saved);
        setIsCustom(true);
      }
    } catch {
      // Local storage not available
    }
  }, []);

  const handleImageError = () => {
    if (photoUrl === defaultPhoto) {
      setPhotoUrl(fallbackPhoto);
    } else if (photoUrl !== placeholderPhoto) {
      setPhotoUrl(placeholderPhoto);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        setIsCustom(true);
        try {
          localStorage.setItem("couple_photo", result);
        } catch {
          // Exceeded quota or disabled
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const resetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem("couple_photo");
      localStorage.removeItem("rani_didi_photo");
    } catch {
      // ignore
    }
    setIsCustom(false);
    setPhotoUrl(defaultPhoto);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`didi-photo-frame ${isDragging ? "is-dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      title="Click or drag an image to customize the couple's photo"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
        aria-label="Upload photo of Rani Didi and Jiju"
      />

      <div className="photo-tape" aria-hidden="true" />
      <div className="photo-corner-sparkle" aria-hidden="true">✦</div>

      <div className="photo-image-wrapper">
        <img
          src={photoUrl}
          alt="Rani Didi & Jiju"
          className="photo-image"
          onError={handleImageError}
        />
        <div className="photo-overlay">
          <div className="photo-overlay-badge">
            <Camera size={16} />
            <span>{isCustom ? "Change Photo" : "Upload Photo"}</span>
          </div>
          <span className="photo-overlay-hint">Drag & drop or click to choose from computer</span>
        </div>
      </div>

      <div className="photo-details">
        <div className="photo-title-row">
          <h4 className="photo-name">Rani Didi &amp; Jiju</h4>
          <span className="photo-heart"><Heart size={14} fill="currentColor" /></span>
        </div>
        <p className="photo-tagline">The most wonderful new parents <span>✧</span></p>
        <div className="photo-meta-bar">
          <span className="photo-meta-pill">
            <Sparkles size={11} />
            <span>Two hearts, one miracle</span>
          </span>
          {isCustom && (
            <button
              className="photo-reset-button"
              onClick={resetPhoto}
              title="Reset to default photo"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
